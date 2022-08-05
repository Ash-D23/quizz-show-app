import { userProfileReducerFn } from "../../Reducers";

describe("User Profile Reducer", () => {
    test("Update UserName", () => {

    const initialState = {
      email: "test@test.com",
      firstName: "test",
      gender: "Male",
      lastName: "test",
      uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
      userName: "testddc bdf",
    }
    
    const action = {
        type: 'updateUserName',
        payload: "abcd"
    }

    const finalState = {
      email: "test@test.com",
      firstName: "test",
      gender: "Male",
      lastName: "test",
      uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
      userName: "abcd",
    }

    const state = userProfileReducerFn(initialState, action)

    expect(state).toEqual(finalState)
      
    });

    test("Update FirstName", () => {

      const initialState = {
        email: "test@test.com",
        firstName: "test",
        gender: "Male",
        lastName: "test",
        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
        userName: "testddc bdf",
      }
      
      const action = {
          type: 'updateFirstName',
          payload: "abcd"
      }
  
      const finalState = {
        email: "test@test.com",
        firstName: "abcd",
        gender: "Male",
        lastName: "test",
        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
        userName: "testddc bdf",
      }
  
      const state = userProfileReducerFn(initialState, action)
  
      expect(state).toEqual(finalState)
        
    });

    test("Update LastName", () => {

      const initialState = {
        email: "test@test.com",
        firstName: "test",
        gender: "Male",
        lastName: "test",
        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
        userName: "testddc bdf",
      }
      
      const action = {
          type: 'updateLastName',
          payload: "abcd"
      }
  
      const finalState = {
        email: "test@test.com",
        firstName: "test",
        gender: "Male",
        lastName: "abcd",
        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
        userName: "testddc bdf",
      }
  
      const state = userProfileReducerFn(initialState, action)
  
      expect(state).toEqual(finalState)
        
    }); 

    test("Update Phone", () => {

      const initialState = {
        email: "test@test.com",
        firstName: "test",
        gender: "Male",
        lastName: "test",
        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
        userName: "testddc bdf",
      }
      
      const action = {
          type: 'updatePhone',
          payload: "89008754318"
      }
  
      const finalState = {
        email: "test@test.com",
        firstName: "test",
        gender: "Male",
        lastName: "test",
        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
        userName: "testddc bdf",
        phone: "89008754318"
      }
  
      const state = userProfileReducerFn(initialState, action)
  
      expect(state).toEqual(finalState)
        
    });

    test("Update Gender", () => {

      const initialState = {
        email: "test@test.com",
        firstName: "test",
        gender: "Male",
        lastName: "test",
        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
        userName: "testddc bdf",
      }
      
      const action = {
          type: 'updateGender',
          payload: "Female"
      }
  
      const finalState = {
        email: "test@test.com",
        firstName: "test",
        gender: "Female",
        lastName: "test",
        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
        userName: "testddc bdf"
      }
  
      const state = userProfileReducerFn(initialState, action)
  
      expect(state).toEqual(finalState)
        
    });

    test("Reset Profile", () => {

      const initialState = {
        email: "test@test.com",
        firstName: "Laal",
        gender: "Male",
        lastName: "Singh",
        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
        userName: "testddc bdf",
      }
      
      const action = {
          type: 'resetProfile',
          payload: {
            email: "test@test.com",
            firstName: "test",
            gender: "Male",
            lastName: "test",
            uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
            userName: "testddc bdf",
          }
      }
  
      const finalState = {
        email: "test@test.com",
        firstName: "test",
        gender: "Male",
        lastName: "test",
        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
        userName: "testddc bdf",
      }
  
      const state = userProfileReducerFn(initialState, action)
  
      expect(state).toEqual(finalState)
        
    });
})