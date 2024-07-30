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
import RegisterNewLinkModal from "./components/register-new-link-modal";
import RegisterParticipantsModal from "./components/register-participants-modal";
import UpdateTripModal from "./components/update-trip-modal";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

const TripDetailsPage = () => {
  const { tripId } = useParams();

  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState<boolean>(false);
  const [isRegisterNewLinkModalOpen, setIsRegisterNewLinkModalOpen] = useState<boolean>(false);
  const [isRegisterParticipantsModalOpen, setIsRegisterParticipantsModalOpen] = useState<boolean>(false);
  const [isUpdateTripModalOpen, setIsUpdateTripModalOpen] = useState<boolean>(false);
  const [trip, setTrip] = useState<TripProps | null>(null);
  const [listActivities, setListActivities] = useState<ActivityProps[]>([]);
  const [updateActivies, setUpdateActivies] = useState<boolean>(false);
  const [updateRegisterNewLink, setUpdateRegisterNewLink] = useState<boolean>(false);
  const [updateRegisterParticipants, setUpdateRegisterParticipants] = useState<boolean>(false);
  const [updateTrip, setUpdateTrip] = useState<boolean>(false);
  const [listLinks, setListLinks] = useState<LinkProps[]>([]);
  const [listParticipants, setListParticipants] = useState<ParticipantsProps[]>([]);
  const [destination, setDestination] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange>();

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

  const fetchRegisterNewLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);    
    const title = data.get('title')?.toString();
    const url  = data.get('url')?.toString();

    try {
      await api.post(`/trips/${tripId}/links`, {
        url,
        title
      });

      setIsRegisterNewLinkModalOpen(false);
      setUpdateRegisterNewLink((prev) => !prev)
    } catch(error) {
      console.log(error)
    }
  };

  const fetchRegisterParticipants = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);    
    const mail = data.get('mail')?.toString();

    try {
      await api.post(`/trips/${tripId}/invites`, { email: mail });

      setIsRegisterParticipantsModalOpen(false);
      setUpdateRegisterParticipants((prev) => !prev)
    } catch(error) {
      console.log(error)
    }
  };

  const fetchUpdateTrip = async () => {

    if (!destination) {
      return
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return
    }

    try {
      await api.put(`/trips/${tripId}`, {
        destination: destination,
        starts_at: eventStartAndEndDates.from,
        ends_at: format(eventStartAndEndDates.to, 'yyyy-MM-dd 23:59:59')
      });

      setIsUpdateTripModalOpen(false);
      setUpdateTrip((prev) => !prev);
      setEventStartAndEndDates(undefined);
    } catch(error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await api.get(`/trips/${tripId}/links`);
        setListLinks(response.data.links)
      } catch (error) {
        console.log(error)
      }
    };

    fetchLinks();
  }, [tripId, updateRegisterNewLink]);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await api.get(`/trips/${tripId}/participants`);
        setListParticipants(response.data.participants)
      } catch (error) {
        console.log(error)
      }
    };
    
    fetchParticipants();
  }, [tripId, updateRegisterParticipants])

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
  }, [tripId, updateTrip]);

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
  }, [tripId, updateActivies, updateTrip])

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader
        infoTrip={trip}
        openModal={setIsUpdateTripModalOpen}
      />
      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>

            <button onClick={() => setIsCreateActivityModalOpen(true)} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
              <Plus className="size-5" />
              Cadastrar atividade
            </button>
          </div>

          <Activities list={listActivities} />
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks
            listLinks={listLinks}
            openModal={setIsRegisterNewLinkModalOpen}
          />

          <div className="w-full h-px bg-zinc-800" />

          <Guests
            listParticipants={listParticipants}
            openModal={setIsRegisterParticipantsModalOpen}
          />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal 
          closeCreateActivityModal={setIsCreateActivityModalOpen}
          createActivity={fetchCreateActivities}
        />
      )}

      {isRegisterNewLinkModalOpen && (
        <RegisterNewLinkModal
          closeRegisterNewLinkModal={setIsRegisterNewLinkModalOpen}
          registerNewLink={fetchRegisterNewLink}
        />
      )}

      {isRegisterParticipantsModalOpen && (
        <RegisterParticipantsModal
          closeModal={setIsRegisterParticipantsModalOpen}
          register={fetchRegisterParticipants}
        />
      )}

      {isUpdateTripModalOpen && (
        <UpdateTripModal
          closeModal={setIsUpdateTripModalOpen}
          setDestination={setDestination}
          eventStartAndEndDates={eventStartAndEndDates}
          setEventStartAndEndDates={setEventStartAndEndDates}
          fetchUpdateTrip={fetchUpdateTrip}
        />
      )}
    </div>
  )
}

export default TripDetailsPage;