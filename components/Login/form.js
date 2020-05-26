import styles from "./form.module.scss";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

const form = () => {
  return (
    <div className={styles.container}>
      <TextField
        id="outlined-basic"
        label="E-mail"
        variant="outlined"
        className={styles.input}
      />
      <TextField
        id="outlined-basic"
        label="Password"
        variant="outlined"
        type="password"
        className={styles.input}
      />
      <div className={styles.radio}>
        <p>Login as</p>
        <RadioGroup
          row
          aria-label="gender"
          name="gender1"
          defaultValue="farmer"
        >
          <FormControlLabel value="farmer" control={<Radio />} label="Farmer" />
          <FormControlLabel
            value="company"
            control={<Radio />}
            label="Company"
          />
        </RadioGroup>
      </div>

      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        size="large"
      >
        Login
      </Button>
    </div>
  );
};

export default form;
