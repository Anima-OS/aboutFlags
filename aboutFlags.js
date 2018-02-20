"use strict";

// Register the about:flags URL.
const Ci = Components.interfaces;
const Cu = Components.utils;

const { XPCOMUtils } = Cu.import("resource://gre/modules/XPCOMUtils.jsm", {});
const { Services } = Cu.import("resource://gre/modules/Services.jsm", {});

const { nsIAboutModule } = Ci;

function AboutFlags() { }

AboutFlags.prototype = {
  uri: Services.io.newURI("chrome://browser/content/aboutflags/aboutFlags.html"),
  classDescription: "about:flags",
  classID: Components.ID("1afde580-092f-11e8-b566-0800200c9a66"),
  contractID: "@mozilla.org/network/protocol/about;1?what=flags",

  QueryInterface: XPCOMUtils.generateQI([nsIAboutModule]),

  newChannel: function (uri, loadInfo) {
    let chan = Services.io.newChannelFromURIWithLoadInfo(
      this.uri,
      loadInfo
    );
    chan.owner = Services.scriptSecurityManager.getSystemPrincipal();
    return chan;
  },

  getURIFlags: function (uri) {
    return nsIAboutModule.ALLOW_SCRIPT;
  }
};

this.NSGetFactory = XPCOMUtils.generateNSGetFactory([
  AboutFlags
]);