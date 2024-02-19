import { makeResponse, statusCodes, responseMessages} from "../../utilities/index.js";
//Response Status code
const {SERVER_ERROR} = statusCodes;
//Response Messages
const {ACCEPT_PARAMETER, INVALID_USERS_TYPE} = responseMessages;
  export const filterFieldsInUsersResponse = (res, users, fields) => {
    console.log(users, "users>>>>>>>>>>>>")
    if (!Array.isArray(fields) && typeof fields !== 'string') {
      return makeResponse(res, SERVER_ERROR, false, ACCEPT_PARAMETER);
    }
  
    const filterItem = (item) => {
      const filteredUser = { ...item.toObject() };
  
    if (Array.isArray(fields)) {
      fields.forEach(field => {
        delete filteredUser[field];
      });
    } else {
      delete filteredUser[fields];
    }
  
      return filteredUser;
    };
  
    if (Array.isArray(users)) {
      // If users is an array, apply filtering to each user
      const u = users.map(user => filterItem(user));
      return u
    } else if (typeof users === 'object') {
      // If users is an object, apply filtering to the object
      return filterItem(users);
    } else {
      return makeResponse(res, SERVER_ERROR, false, INVALID_USERS_TYPE);
    }
  };