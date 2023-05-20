import useAppStore, { defaultAlert } from "@stores/app";

export const openAlert = (alert: App.IAlert) => {
  useAppStore.setState({ alert: { ...alert, show: true } });
}

export const closeAlert = () => {
  useAppStore.setState({ alert: defaultAlert });
}