import React, { useState } from "react";

function SignupPage() {

        const [email,setEmail]= useState('');
        const [password,setPassword]= useState('');
        const [erreur,setErreur]= useState('');
        const [ErreurName,setErreurName]= useState('');
        const [erreurEmail,setErreurEmail]= useState('');
        const [ErreurPassword,setErreurPassword]= useState('');
  return (
    <>
    <form action="" method="get" return false >
      <input type="text" name="name" id="name" onChange={e => setName(e.target.value)}/>
      <input type="email" name="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" name="password" id="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)}/>
      <button type="submit">S'inscrire'</button>
    </form>
    <p>{erreur}</p>
    </>
  );
}

export default SignupPage;