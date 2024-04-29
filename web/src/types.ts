export interface FigtherInterface {
  "@id": string;
  "@type": string;
  id: number;
  name: string;
  description: string;
  created_at: string;
  fight: string[];
  skills: string[];
}

export interface FightData {
  id: number;
  title: string;
  message: string;
  fighters_needed: number;
  fighting: boolean;
  cover: boolean;
  address: string;
}
