import { assign, createMachine, Sender } from "xstate";

interface DeduplicationMachineContext {}

type DeduplicationMachineEvent = {
  type: "GO";
  action: () => void;
};

const deduplicationMachine = createMachine<
  DeduplicationMachineContext,
  DeduplicationMachineEvent
>(
  {
    id: "deduplication",
    initial: "canPerformAction",
    states: {
      canPerformAction: {
        on: {
          GO: {
            target: "deduplicating",
            actions: "performAction",
          },
        },
      },
      deduplicating: {
        after: {
          2000: {
            target: "canPerformAction",
          },
        },
      },
    },
  },
  {
    actions: {
      performAction: (context, event) => {
        return event.action();
      },
    },
  },
);

export default deduplicationMachine;