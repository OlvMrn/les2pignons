import React from "react";

import SignForm from "../components/SignForm";

function ConnexionPage() {
  return (
    <div>
      <SignForm type="signup" />
      <SignForm type="signin" />
    </div>
  );
}

export default ConnexionPage;
