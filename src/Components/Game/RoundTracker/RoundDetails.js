import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { roundTrackerDetail, correct, incorrect } from "./index.module.css";

const RoundDetails = ({ round, guesses }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const correctGuesses = guesses
    .filter(({ isCorrect }) => isCorrect)
    .map(({ guess }) => guess);

  console.log(correctGuesses);

  return (
    <Card>
      <CardHeader
        title={`Round ${round}`}
        subheader={guesses.map(({ guess }) => guess).join(",")}
        action={
          <IconButton
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {guesses.map(({ isCorrect, guess, childConcept }) => {
            if (isCorrect) {
              return (
                <FormControl disabled>
                  <InputLabel>{childConcept}</InputLabel>
                  <Select value={guess}>
                    <MenuItem value={guess}>{guess}</MenuItem>
                  </Select>
                </FormControl>
              );
            }
            return (
              <FormControl>
                <InputLabel>{childConcept}</InputLabel>
                <Select>
                  {[1, 2, 3, 4, 5]
                    .filter(
                      (value) =>
                        !correctGuesses.includes(value) && value !== guess
                    )
                    .map((value) => {
                      return <MenuItem value={value}>{value}</MenuItem>;
                    })}
                </Select>
              </FormControl>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RoundDetails;
