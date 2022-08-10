import firebase from '../../firebase';

jest.mock('../../firebase', () => {
    return {
        auth: {
            currentUser: true,
            signOut() {
                return Promise.resolve("success");
            },
            signInWithEmailAndPassword(email, password) {
                return new Promise((resolve, reject) => {
                if (password === 'sign' || password === 'key') {
                    resolve({
                        email: "test@test.com",
                        firstName: "test",
                        gender: "Male",
                        lastName: "test",
                        uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
                        userName: "testddc bdf",
                      });
                }
                reject(Error('sign in error '));
                });
            },
            createUserWithEmailAndPassword(email, password) {
                return new Promise((resolve, reject) => {
                if (password === 'create' || password === 'key') {
                    resolve({ name: 'createUser' });
                }
                reject(Error('create user error '));
                });
            }
        }
    }
  });

describe("Authentication", () => {
    test("Login", async () => {
        const results = await firebase.auth.signInWithEmailAndPassword("test@test.com", "sign")
        
        expect(results).toEqual({
            email: "test@test.com",
            firstName: "test",
            gender: "Male",
            lastName: "test",
            uid: "A01YCODqSug6aZsgLG6vdBQRopn1",
            userName: "testddc bdf",
          })
    });

    test("SignUp", async () => {
        const results = await firebase.auth.createUserWithEmailAndPassword("test@test.com", "create")
        
        expect(results).toEqual({ name: 'createUser' })
    });

    test("SignOut", async () => {
        const results = await firebase.auth.signOut()
        
        expect("success").toEqual(results)
    });

})