import { redirect } from "next/navigation";

export async function getServerSideProps(context){
  const res = await fetch("/api/session")

}

export default function Home() {
  redirect("/step1");
}
