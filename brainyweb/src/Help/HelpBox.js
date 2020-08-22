import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import HelpCard from "./HelpCard";

const useStyles = makeStyles((theme) => ({
  helpSummary: {
    fontSize: 20,
    marginTop: theme.spacing(2),
  },
  helpCards: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignContent: "space-around",
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const HelpBox = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography className={classes.helpSummary} variant="body2" component="p">
        Forget forgetting with Brainylog. It keeps your memories secure and
        accessible from anyplace. Plus, it reminds you about the stuff you might
        be missing out on.
      </Typography>

      <div className={classes.helpCards}>
        <HelpCard
          helpTitle="Your first note"
          helpText="Brainylog can do lots of things to help you remember. But it all starts with a simple note.
        Simply go to the Get Started page, enter a name for your note under create note and click on the note once created.
        Then, you can type in whatever you want in the info section and hit save. That's all folks!"
        />

        <HelpCard
          helpTitle="Separate the todos from the info"
          helpText="It's great to have some information handy. But sometimes you want to do stuff with that information too.
        And keep yourself reminded about them too. You can create todos related to your notes in the tasks section of the note.
        A task has both a summary for easy viewing, as well as a details section you can access by clicking on the = button.
        You can also schedule deadlines, mark tasks as completed, and hold and drag them around so the important ones are up high."
        />

        <HelpCard
          helpTitle="Tags are your friends"
          helpText="Having lots of little notes lying around can quickly clutter up things. Add relevant tags to your notes to keep stuff organized.
        For example, you could have all your quantum physics related research under a 'quantum physics' tag. You can add multiple tags to your notes."
        />

        <HelpCard
          helpTitle="Search for stuff"
          helpText="You've entrusted Brainylog with your memories, now you want them back. You can search by notes, tasks, tags, and information. Enter a search text to
        filter results. Empty search texts will show random matches. Empty note searches will show all your notes. Click on a result to go to it."
        />

        <HelpCard
          helpTitle="Share your wisdom"
          helpText="You can send and receive notes. To send a note, make it shareable by clicking on the lock icon to unlock it. Then, you can click on
          the clipboard icon to get a shareable link that you can send to your friends. You can make the file private again by clicking on the unlocked icon again."
        />
      </div>
    </React.Fragment>
  );
};
export default HelpBox;
