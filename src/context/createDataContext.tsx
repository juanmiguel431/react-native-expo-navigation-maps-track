import React, { PropsWithChildren, useMemo, useReducer } from 'react';

export type BoundedAction = (...arg: any) => void;
export type BoundedActions = Record<string, BoundedAction>;

export type ActionType<A> = (dispatch: React.Dispatch<A>) => BoundedAction;
export type ActionTypes<A> = Record<string, ActionType<A>>

type ContextStateType<S,A,R extends ActionTypes<A>> = { state: S } & { [K in keyof R]: ReturnType<R[K]> };

export default function createDataContext <R extends ActionTypes<A>,S,A>(reducer: React.Reducer<S, A>, actions: R, initialState: S) {
  const Context = React.createContext<ContextStateType<S,A,R>>({} as ContextStateType<S,A,R>);

  const Provider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundsActions = useMemo(() => {
      const boundsActions: BoundedActions = {};
      for (const key in actions) {
        boundsActions[key] = actions[key](dispatch);
      }

      return boundsActions;
    }, []);

    return (
      <Context.Provider value={{ state: state, ...boundsActions } as ContextStateType<S, A, R>}>
        {children}
      </Context.Provider>
    );
  }

  return { Context, Provider }
}
