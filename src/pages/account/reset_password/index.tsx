import { type ReactNode, useState } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

interface SignUpFormState {
  new_password: string;
  confirm_password: string;
}

export default function ResetPassword(): ReactNode {

  const [passData, setPassData] = useState<SignUpFormState>({
    new_password: '',
    confirm_password: '',
  })

  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState(false);

  function updateRequirement(id, condition, isEmpty) {
    var element = document.getElementById(id);
    if (isEmpty) {
      element.removeAttribute("class");
      return;
    }
    element.classList.toggle(styles.checked, condition);
    element.classList.toggle(styles.unchecked, !condition);
  }

  const validatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let letterCheck = /[a-zA-Z]/.test(value);
    let numCheck = /\d/.test(value);
    let lenCheck = value.length >= 8;
    let emptyCheck = value.trim() == "";

    updateRequirement("letterCheck", letterCheck, emptyCheck);
    updateRequirement("numCheck", numCheck, emptyCheck);
    updateRequirement("lenCheck", lenCheck, emptyCheck);

    setPassData(prevData => ({ ...prevData, [name]: value }));
    return letterCheck && numCheck && lenCheck && emptyCheck;
  }

  const validateConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    var matchCheck = value === passData["new_password"];
    let emptyCheck = value.trim() !== "" && passData["new_password"].trim() !== "";

    setPassData(prevData => ({ ...prevData, [name]: value }))

    if (matchCheck && emptyCheck || value == "") {
      if (value !== "")
        document.getElementById("submitBtn").classList.toggle("disabled", false);
      document.getElementById("requirementError").innerText = "";
      document.getElementById("confirm_password").classList.toggle(styles.error, false);
    }
    else {
      document.getElementById("submitBtn").classList.toggle("disabled", true);
      document.getElementById("requirementError").innerText = "Passwords do not match!";
      document.getElementById("confirm_password").classList.toggle(styles.error, true);
    }

    return matchCheck && emptyCheck
  }

  const handleSubmit = () => {
    setSubmitted(true);
    var token = new URLSearchParams(window.location.search).get("token");
    var postBody = "password=" + encodeURIComponent(passData["new_password"]) + "&vpassword=" + encodeURIComponent(passData["confirm_password"]) + "&token=" + encodeURIComponent(token);

    fetch("https://game.sitekickremastered.com/reset_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: postBody
    })
      .then(response => {
        setStatus(response.ok);
        if (!response.ok)
          throw new Error("Failed to reset password: " + response.statusText);     
      })
      .catch(error => {
        console.error("Error:", error);
        setStatus(false);
      });
  }

  // console.log(passData);

  return (
    <Layout title={`Reset Password`} description="Clickity-click, it's Sitekick!">
      <main className={styles.resetPasswordContainer}>
        {!submitted ?
          <>
            <h1>Reset Password</h1>
            <p>Your new password must meet the following requirements:</p>
            <ul id="passwordRequirements" className={styles.passwordRequirements}>
              <li id="letterCheck">Contain at least one letter (A-Z or a-z)</li>
              <li id="numCheck">Contain at least one number (0-9)</li>
              <li id="lenCheck">Be at least 8 characters long</li>
            </ul>

            <form>

              <div className="row">
                <div className="col col--6">
                  <div>
                    <label htmlFor="new_password">New Password:</label>
                    <br />
                    <input type="password" name="new_password" id="new_password" onChange={validatePassword} value={passData.new_password} required />
                  </div>
                </div>
                <div className="col col--6">
                  <div>
                    <label htmlFor="confirm_password">Confirm Password:</label>
                    <br />
                    <input type="password" name="confirm_password" id="confirm_password" onChange={validateConfirm} value={passData.confirm_password} required />
                    <div id="requirementError" className={styles.inputError}></div>
                  </div>
                </div>
              </div>
              <div className="row">
                <a id="submitBtn" className="button disabled" type="submit" onClick={handleSubmit}>Submit</a>
              </div>

            </form>
          </>
          :
          submitted && status ?
          <>
            <h1>Password reset successful!</h1>
            <p>Your password reset was successful! Please log into the game with your new password.</p>
          </>
          :
          <>
            <h1>Error: Failed to reset password</h1>
            <p>An error occurred while resetting the password. Please try again later.</p>
            <p>If this issue persists, please <a href="/contact">contact us</a>.</p>
          </>
        }
      </main>
    </Layout>
  );
}
