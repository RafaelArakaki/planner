export type ActivityProps = {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[]
}