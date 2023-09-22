import { registerPlugin, ChecklistElement } from "@pexip/plugin-api";

let feccListOptions: ChecklistElement["options"];

let fecc = false;
let fecc_uuid = "";
let self_uuid = "";

//SVG Icons
const feccIconSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z" fill="white"/></svg>';

const feccIconHoverSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z" fill="black"/></svg>';

const feccEnabledIconSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z" fill="aqua"/></svg>';

const feccEnabledHoverIconSVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M278.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l9.4-9.4V224H109.3l9.4-9.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-64 64c-12.5 12.5-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4H224V402.7l-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l64 64c12.5 12.5 32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-9.4 9.4V288H402.7l-9.4 9.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l64-64c12.5-12.5 12.5-32.8 0-45.3l-64-64c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l9.4 9.4H288V109.3l9.4 9.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-64-64z" fill="aqua"/></svg>';

const plugin = await registerPlugin({
  id: "fecc-plugin",
  version: 1.0,
});

const fecc_Button = await plugin.ui
  .addButton({
    position: "toolbar",
    icon: {
      custom: { main: feccIconSVG, hover: feccIconHoverSVG },
    },
    tooltip: "Far End Camera Control",
    roles: ["chair"],
  })
  .catch((e) => {
    console.warn(e);
  });

fecc_Button?.onClick.add(async () => {
  if (fecc === false) {
    const input = await plugin.ui.addForm({
      title: "Far End Camera Control",
      description: "Use arrow keys & mouse scroll to control",
      form: {
        elements: {
          participantList: {
            name: "FECC video room",
            type: "select",
            options: feccListOptions,
          },
          spotlight: {
            name: "",
            type: "checklist",
            options: [
              { id: "true", label: "Spotlight Participant", checked: true },
            ],
          },
        },
        submitBtnTitle: "Select",
      },
    });

    input.onInput.add(async (formInput) => {
      const selectedRoom = formInput.participantList;
      const spotlightEnabled = formInput.spotlight;
      if (selectedRoom) {
        fecc_uuid = selectedRoom;
        fecc = true;
        console.log("Spotlight:", spotlightEnabled);
        if (spotlightEnabled) {
          var setSpotlight = plugin.conference.spotlight({
            enable: true,
            participantUuid: fecc_uuid,
          });
        } else {
          var setSpotlight = plugin.conference.spotlight({
            enable: false,
            participantUuid: fecc_uuid,
          });
        }

        console.log("FECC enabled", selectedRoom, spotlightEnabled);
        void plugin.ui.showToast({
          message: `🔎 Far end camera control is enabled`,
        });
      }
      input.remove();
    });

    await fecc_Button.update({
      position: "toolbar",
      icon: {
        custom: { main: feccEnabledIconSVG, hover: feccEnabledHoverIconSVG },
      },
      tooltip: "Far End Camera Control",
      roles: ["chair"],
    });
  } else {
    fecc = false;
    console.log("FECC disabled!");
    void plugin.ui.showToast({
      message: `🔎 Far end camera control is disabled `,
    });

    await fecc_Button.update({
      position: "toolbar",
      icon: { custom: { main: feccIconSVG, hover: feccIconHoverSVG } },
      tooltip: "Far-end Camera Control",
      roles: ["chair"],
    });
  }
});

//await plugin.ui.showToast({ message: "Welcome...🌏" });

await plugin.events.authenticatedWithConference.add((alias) => {
  void plugin.ui.showToast({
    message: `🏠 Welcome: ` + alias.conferenceAlias,
  });
  console.log("Authenticated Conference", alias);
});

await plugin.events.me.addOnce((self) => {
  //Multiple events for BR if using .add
  console.log("Self: ", self);
  self_uuid = self.participant.uuid;
});

await plugin.events.connected.add(() => {
  // Is connected
});

await plugin.events.layoutUpdate.add((layout) => {
  console.log("Layout: ", layout);
});

await plugin.events.conferenceStatus.add((conference) => {
  console.log("Conference Status: ", conference);
});

await plugin.events.participants.add((roster) => {
  console.log("Participants:", roster);

  const particpantRoster = roster.participants.map((participant, index) => ({
    id: participant.uuid,
    label: participant.uri.replace("sip:", ""),
  }));

  const feccParticipants = roster.participants
    .filter((participant) => participant.canFecc === true)
    .map((participant, index) => ({
      id: participant.uuid,
      label: participant.uri.replace("sip:", ""),
    }));

  if (feccParticipants.length === 0) {
    feccListOptions = [{ id: "0", label: "NONE" }]; //Empty FECC list
  } else {
    feccListOptions = feccParticipants;
  }
});

await window.parent.addEventListener(
  "keydown",
  (event) => {
    if (fecc === true) {
      var name = event.key;
      //var code = event.code;
      //console.log("FECC Key Down:", name, event, fecc_uuid);

      switch (name) {
        case "ArrowLeft":
          fecc_Send("pan", "left");
          break;
        case "ArrowRight":
          fecc_Send("pan", "right");
          break;
        case "ArrowUp":
          fecc_Send("tilt", "up");
          break;
        case "ArrowDown":
          fecc_Send("tilt", "down");
          break;
        default:
      }
    }
  },
  false
);

function fecc_Send(axis, direction) {
  console.log("FECC:", fecc_uuid, axis, direction);
  let request = {
    method: "POST",
    path: "participants/" + fecc_uuid + "/fecc",
    payload: {
      action: "start",
      movement: [{ axis: axis, direction: direction }],
      timeout: 1000,
    },
  };
  plugin.conference.sendRequest(request);
}

await window.parent.addEventListener("wheel", (event) => {
  if (fecc === true) {
    const zoom = -Math.sign(event.deltaY);
    //console.log("FECC Mouse Scroll:", zoom, fecc_uuid);

    switch (zoom) {
      case 1:
        fecc_Send("zoom", "in");
        break;
      case -1:
        fecc_Send("zoom", "out");
        break;
      default:
    }
  }
});
