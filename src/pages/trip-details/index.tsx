import { Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DestinationAndDateHeader from "./components/destination-and-date-header";
import Activities from "./components/activities";
import ImportantLinks from "./components/important-links";
import Guests from "./components/guest";
import CreateActivityModal from "./components/create-activity-modal";
import { api } from "../../services/api";
import type { TripProps } from "../../types/trip.d";
import { ActivityProps } from "../../types/activities.d";
import { LinkProps } from "../../types/links.d";
import { ParticipantsProps } from "../../types/participants.d";

const TripDetailsPage = () => {
  const { tripId } = useParams();

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
  const [trip, setTrip] = useState<TripProps | null>(null);
  const [listActivities, setListActivities] = useState<ActivityProps[] | null>(null);
  const [updateActivies, setUpdateActivies] = useState<boolean>(false);
  const [listLinks, setListLinks] = useState<LinkProps[] | null>(null);
  const [listParticipants, setListParticipants] = useState<ParticipantsProps[] | null>(null);

  const openCreateActivityModal = () => {
    setIsCreateActivityModalOpen(true)
  }

  const closeCreateActivityModal = () => {
    setIsCreateActivityModalOpen(false)
  }

  const fetchCreateActivities = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const occurs_at  = data.get('occurs_at')?.toString();
    const title = data.get('title')?.toString();

    try {
      await api.post(`/trips/${tripId}/activities`, {
        occurs_at: `${occurs_at}:00`,
        title: title
      });

      setIsCreateActivityModalOpen(false);
      setUpdateActivies((prev) => !prev);

    } catch(error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await api.get(`/trips/${tripId}`);
        setTrip(response.data.trip)
      } catch (error) {
        console.log(error)
      }
    };

    fetchTrip();

    const fetchLinks = async () => {
      try {
        const response = await api.get(`/trips/${tripId}/links`);
        setListLinks(response.data.links)
      } catch (error) {
        console.log(error)
      }
    };

    fetchLinks();

    const fetchParticipants = async () => {
      try {
        const response = await api.get(`/trips/${tripId}/participants`);
        setListParticipants(response.data.participants)
      } catch (error) {
        console.log(error)
      }
    };
    
    fetchParticipants();
  }, [tripId]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await api.get(`/trips/${tripId}/activities`);
        setListActivities(response.data.activities)
      } catch (error) {
        console.log(error)
      }
    };
    
    fetchActivities();
  }, [tripId, updateActivies])

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader infoTrip={trip} />
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <button onClick={openCreateActivityModal} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          <Activities list={listActivities} />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks listLinks={listLinks} />

          <div className="w-full h-px bg-zinc-800" />

          <Guests listParticipants={listParticipants} />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal 
          closeCreateActivityModal={closeCreateActivityModal}
          createActivity={fetchCreateActivities}
        />
      )}
    </div>
  )
}

export default TripDetailsPage;