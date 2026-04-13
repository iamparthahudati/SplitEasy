/**
 * Global app state — built with plain React context + useReducer.
 * Drop-in compatible with Zustand when that library is added later:
 * the shape and selectors are identical.
 *
 * TODO: replace with Zustand once `npm install zustand` is run.
 */

import React, { createContext, useContext, useReducer } from 'react';
import { Group } from '../types/group';
import { Expense, Settlement } from '../types/expense';
import { UserProfile } from '../types/user';

// ─── State shape ──────────────────────────────────────────────────────────────

export interface AppState {
  user: UserProfile | null;
  groups: Group[];
  // expensesByGroup[groupId] = Expense[]
  expensesByGroup: Record<string, Expense[]>;
  // settlementsByGroup[groupId] = Settlement[]
  settlementsByGroup: Record<string, Settlement[]>;
  isPremium: boolean;
  isGuest: boolean;
}

const initialState: AppState = {
  user: null,
  groups: [],
  expensesByGroup: {},
  settlementsByGroup: {},
  isPremium: false,
  isGuest: false,
};

// ─── Actions ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'SET_USER'; payload: UserProfile | null }
  | { type: 'SET_GUEST'; payload: boolean }
  | { type: 'SET_PREMIUM'; payload: boolean }
  | { type: 'SET_GROUPS'; payload: Group[] }
  | { type: 'ADD_GROUP'; payload: Group }
  | { type: 'UPDATE_GROUP'; payload: Group }
  | { type: 'REMOVE_GROUP'; payload: string }
  | { type: 'SET_EXPENSES'; payload: { groupId: string; expenses: Expense[] } }
  | { type: 'ADD_EXPENSE'; payload: { groupId: string; expense: Expense } }
  | { type: 'UPDATE_EXPENSE'; payload: { groupId: string; expense: Expense } }
  | { type: 'REMOVE_EXPENSE'; payload: { groupId: string; expenseId: string } }
  | { type: 'SET_SETTLEMENTS'; payload: { groupId: string; settlements: Settlement[] } }
  | { type: 'ADD_SETTLEMENT'; payload: { groupId: string; settlement: Settlement } }
  | { type: 'RESET' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_GUEST':
      return { ...state, isGuest: action.payload };
    case 'SET_PREMIUM':
      return { ...state, isPremium: action.payload };
    case 'SET_GROUPS':
      return { ...state, groups: action.payload };
    case 'ADD_GROUP':
      return { ...state, groups: [...state.groups, action.payload] };
    case 'UPDATE_GROUP':
      return {
        ...state,
        groups: state.groups.map(g =>
          g.id === action.payload.id ? action.payload : g,
        ),
      };
    case 'REMOVE_GROUP':
      return {
        ...state,
        groups: state.groups.filter(g => g.id !== action.payload),
      };
    case 'SET_EXPENSES':
      return {
        ...state,
        expensesByGroup: {
          ...state.expensesByGroup,
          [action.payload.groupId]: action.payload.expenses,
        },
      };
    case 'ADD_EXPENSE': {
      const existing = state.expensesByGroup[action.payload.groupId] ?? [];
      return {
        ...state,
        expensesByGroup: {
          ...state.expensesByGroup,
          [action.payload.groupId]: [...existing, action.payload.expense],
        },
      };
    }
    case 'UPDATE_EXPENSE': {
      const list = state.expensesByGroup[action.payload.groupId] ?? [];
      return {
        ...state,
        expensesByGroup: {
          ...state.expensesByGroup,
          [action.payload.groupId]: list.map(e =>
            e.id === action.payload.expense.id ? action.payload.expense : e,
          ),
        },
      };
    }
    case 'REMOVE_EXPENSE': {
      const list = state.expensesByGroup[action.payload.groupId] ?? [];
      return {
        ...state,
        expensesByGroup: {
          ...state.expensesByGroup,
          [action.payload.groupId]: list.filter(
            e => e.id !== action.payload.expenseId,
          ),
        },
      };
    }
    case 'SET_SETTLEMENTS':
      return {
        ...state,
        settlementsByGroup: {
          ...state.settlementsByGroup,
          [action.payload.groupId]: action.payload.settlements,
        },
      };
    case 'ADD_SETTLEMENT': {
      const existing = state.settlementsByGroup[action.payload.groupId] ?? [];
      return {
        ...state,
        settlementsByGroup: {
          ...state.settlementsByGroup,
          [action.payload.groupId]: [...existing, action.payload.settlement],
        },
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

interface StoreContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAppStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) { throw new Error('useAppStore must be inside <StoreProvider>'); }
  return ctx;
}

// Convenience selectors
export function useUser() { return useAppStore().state.user; }
export function useGroups() { return useAppStore().state.groups; }
export function useIsPremium() { return useAppStore().state.isPremium; }
export function useIsGuest() { return useAppStore().state.isGuest; }
export function useGroupExpenses(groupId: string) {
  return useAppStore().state.expensesByGroup[groupId] ?? [];
}
export function useGroupSettlements(groupId: string) {
  return useAppStore().state.settlementsByGroup[groupId] ?? [];
}
