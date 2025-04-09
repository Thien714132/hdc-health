import { APPLICATION_ACTION_TYPE } from "./action";
import { Action } from "./appContext";

export const reducer = (prevState: AppState, action: Action) => {
  switch (action.type) {
    case APPLICATION_ACTION_TYPE.LOAD_STATE:
      return {
        ...prevState,
        ...action.payload,
      };

    case APPLICATION_ACTION_TYPE.SAVE_MEAL:
      return {
        ...prevState,
        saveMeal: prevState?.saveMeals.push(action.payload),
      };

    case APPLICATION_ACTION_TYPE.SAVE_DATA_GENERAL:
      return {
        ...prevState,
        general_data: action.payload,
      };

    case APPLICATION_ACTION_TYPE.SAVE_CURRENT_SESSION:
      return {
        ...prevState,
        current_session: action.payload,
      };

    default:
      return prevState;
  }
};
