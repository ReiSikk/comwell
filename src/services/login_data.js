

const logInEndpoint = "http://127.0.0.1:3005/auth/login";

export function submitLoginData(data) {

  console.log("submitLoginData called with:", data);

  let processedInput;
  if (data.username.length && data.password.length) {
    processedInput = {
      username: data.username,
      password: data.password,
    };
  } else {
    processedInput = null;
  }
   
  if(processedInput) {
    return fetch(logInEndpoint, {
      method: "POST",
      body: JSON.stringify(processedInput),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.success === false) {
        //call function to show invalid credentials message on the UI
        console.log("invalid credentials");
      } else {
        //call function to show success message on the UI
        console.log(res, "login successful");
      }
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    })

  } else {
    console.log("invalid input");
    //call function to show invalid input message on the UI
  }
    
}
