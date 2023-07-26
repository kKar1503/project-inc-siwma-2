import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

// ** Types Import
import type { Parameter } from '@/utils/api/client/zod';

export type ParamMap = Record<string, Parameter>;

export interface ParamStates {
  initialized: Date | null;
  params: ParamMap;
}

export interface ParamActions {
  resetParams: () => void;
  setParams: (params: Parameter[], initialized?: Date) => void;
  addParam: (param: Parameter) => void;
  addParams: (params: Parameter[]) => void;
  removeParam: (param: Parameter) => void;
  removeParams: (params: Parameter[]) => void;
  removeParamById: (paramId: string) => void;
  removeParamsByIds: (paramIds: string[]) => void;
}

const initialState: ParamStates = {
  initialized: null,
  params: {},
};

const useParamStore = create<ParamStates & ParamActions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      resetParams: () => {
        set(initialState);
      },
      setParams: (params, initialized) => {
        const paramMap: ParamMap = {};
        params.forEach((p) => {
          paramMap[p.id] = p;
        });

        set({
          initialized: initialized === undefined ? new Date() : initialized,
          params: paramMap,
        });
      },
      addParam: (param) => {
        const { params } = get();

        if (param.id in params) {
          // Already exist
          return;
        }

        const newParam = { ...params };
        newParam[param.id] = param;

        set({
          params: newParam,
        });
      },
      addParams: (newParams) => {
        const { params } = get();

        const updatedParams = { ...params };
        newParams.forEach((p) => {
          updatedParams[p.id] = p;
        });

        set({
          params: updatedParams,
        });
      },
      removeParam: (param) => {
        get().removeParamById(param.id);
      },
      removeParams: (paramsToRemove) => {
        const { params } = get();

        const somethingToRemove = paramsToRemove.some((p) => p.id in params);

        if (somethingToRemove) {
          const updatedParams = { ...params };
          paramsToRemove.forEach((p) => {
            if (p.id in updatedParams) {
              delete updatedParams[p.id];
            }
          });

          set({
            params: updatedParams,
          });
        }
      },
      removeParamById: (paramId) => {
        const { params } = get();
        if (paramId in params) {
          const updatedParams = { ...params };
          if (paramId in updatedParams) {
            delete updatedParams[paramId];
          }

          set({
            params: updatedParams,
          });
        }
      },
      removeParamsByIds: (paramIdsToRemove) => {
        const { params } = get();

        const somethingToRemove = paramIdsToRemove.some((p) => p in params);

        if (somethingToRemove) {
          const updatedParams = { ...params };
          paramIdsToRemove.forEach((p) => {
            if (p in updatedParams) {
              delete updatedParams[p];
            }
          });

          set({
            params: updatedParams,
          });
        }
      },
    }),
    { name: 'param-store' }
  )
);

export default useParamStore;
