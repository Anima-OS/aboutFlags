"use strict";
/* global classnames STKButton InfoBox r React */

window.Experiments = class Experiments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      learnMoreHref: null,
    };
  }

  componentDidMount() {
    this.setState({
      learnMoreHref: "https://google.de",
    });
  }

  render() {
    return (
      r("div", {},
        r(InfoBox, {},
          r("span", { style: style }, "Warning: Experimental features ahead!"),
          r("span", {}, "By enabling these features, you could lose browser data or compromise your security or privacy."),
          r("a", { id: "shield-studies-learn-more", href: this.state.learnMoreHref }, "Learn more"),
        ),
        r(ExperimentList),
      )
    );
  }
};

const style = { color: "red" }

class ExperimentList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      experiments: [],
    };
  }

  async test() {
    const URL = "experiments.url";
    let entries = await getJSON(URL);
    return entries;
  }

  async componentDidMount() {
    // const experiments = [
    //   {
    //     "name": "Netflix1080",
    //     "description": "Play back Netflix movies at up to 1080p resolution.",
    //     "links": [
    //     ],
    //     "preferences": [
    //       {
    //         "name": "extensions.netflix1080.enabled"
    //       }
    //     ]
    //   },
    //   {
    //     name: "WebP",
    //     description: "Enable experimental WebP image support.",
    //     links:
    //       [
    //         { text: "Try out", href: "https://mathiasbynens.be/demo/animated-webp" },
    //         { text: "Learn more", href: "https://developers.google.com/speed/webp/" }
    //       ],
    //     preferences:
    //       [
    //         { name: "image.webp.enabled" }
    //       ],
    //   },
    // ]

    const experiments = await this.test()

    // Sort by active status.
    experiments.sort((a, b) => {
      if (Services.prefs.getBoolPref(a.preferences[0].name, false) == true) return -1;
      if (Services.prefs.getBoolPref(a.preferences[0].name, false) == false) return 1;
    });

    this.test();

    this.setState({
      experiments
    });
  }

  render() {
    return (
      r("ul", { className: "experiment-list" },
        this.state.experiments.map(experiment => (
          r(ExperimentListItem, { experiment })
        )),
      )
    );
  }
}

class ExperimentListItem extends React.Component {

  get checked() {
    if (this.props.experiment.preferences)
      return Services.prefs.getBoolPref(this.state.preferences, false);
  }

  set checked(value) {
    if (this.checked != true) {
      Services.prefs.setBoolPref(value, true);
    }
    else {
      Services.prefs.setBoolPref(value, false);
    }
  }

  constructor(props) {
    super(props);
    this.state = { preferences: this.props.experiment.preferences[0].name }

    this.test = this.test.bind(this);
  }

  test() {
    if (this.props.experiment.preferences) {
      this.checked = this.state.preferences;
      console.info("Experiment %s: %s", this.checked ? "enabled" : "disabled", this.state.preferences)
      this.setState();
    }
  }

  render() {
    const experiment = this.props.experiment;
    return (
      r("li", {
        className: classnames("experiment", { disabled: !this.checked }),
        "data-experiment-name": experiment.name,
      },
        r(STKCheckBox, { onChecked: this.test, checked: this.checked }),
        r("div", { className: "experiment-details" },
          r("div", { className: "experiment-name" }, experiment.name),
          r("div", { className: "experiment-description", title: experiment.description },
            r("span", { className: "experiment-status" }, this.checked ? "Enabled" : "Disabled"),
            r("span", {}, "\u2022"), // &bullet;
            r("span", {}, experiment.description),
            experiment.links.map(link => (
              r("a", { href: link.href }, link.text + " ")),
            ),
          ),
        ),
      )
    );
  }
}

const { classes: Cc, interfaces: Ci, utils: Cu } = Components;
Cu.import("resource://gre/modules/XPCOMUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");

const { require } = Cu.import("resource://devtools/shared/Loader.jsm", {});
const { getJSON } = require("devtools/client/shared/getjson");