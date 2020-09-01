import {
  Reducer,
  createStore,
  compose,
  applyMiddleware,
  combineReducers,
} from "redux";
import storage from "redux-storage";
import createEngine from "redux-storage-engine-localstorage";

interface SystemState {
  initialized: boolean;
}

const initialState: SystemState = {
  initialized: false,
};

const SYSTEM_INITIALIZE = "SYSTEM_INITIALIZE";

interface SystemInitializeAction {
  type: typeof SYSTEM_INITIALIZE;
  at: Date;
}

type SystemActionTypes = SystemInitializeAction;

function systemAction(at: Date): SystemActionTypes {
  return {
    type: SYSTEM_INITIALIZE,
    at,
  };
}

const systemReducer: Reducer<SystemState, SystemActionTypes> = (
  state: SystemState = initialState,
  action: SystemActionTypes
): SystemState => {
  console.info(state, action);
  switch (action.type) {
    case SYSTEM_INITIALIZE:
      return {
        initialized: true,
      };
    default:
      console.error(state);
      throw Error();
  }
};

const engine = createEngine("my-save-key");

// export const reducer = storage.reducer({});

export const store = createStore(
  combineReducers({ system: systemReducer }),
  compose(applyMiddleware(storage.createMiddleware(engine)))
);

store.dispatch(systemAction(new Date()));
