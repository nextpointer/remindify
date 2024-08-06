
const createAccount = document.getElementById("CreateAccountBtn");
createAccount.addEventListener("click", (e) => {
  var fullName = document.querySelector(".reminder-input:nth-of-type(1)");
  var email = document.querySelector(".reminder-input:nth-of-type(1)");
//   var password = document.querySelector(".reminder-input:nth-of-type(3)").value;
//   var confirmPassword = document.querySelector(
//     ".reminder-input:nth-of-type(4)"
//   ).value;
  console.log(fullName);

//   if (password !== confirmPassword) alert("Password is not matched");
  return;

//   var data = {
//     fullName,
//     email,
//     password,
//   };
//   //   send data using axios
//   axios.post('localhost:8000/register',data)
//   .then((e)=>{
//     console.log(e.data);
//   })
//   .catch((e)=>{
//     console.log("The error is ",e);
//   })
});
