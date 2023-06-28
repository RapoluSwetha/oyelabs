const person = {
    id: 19,
    gender: 'female'
  };
  
  const student = {
    name: "swetha",
    email: "swetha11@yopmail.com"
  };
  
  const combinedObject = {
    ...person,
    ...student
  };
  
  console.log(combinedObject);
  