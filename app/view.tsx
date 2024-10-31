"use client"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Metadata } from "next"
import Image from "next/image"
import { NumberInput } from "@/components/NumberInput"
import { Button } from "components/Button/Button"
import { LP_GRID_ITEMS } from "lp-items"

export default function HomePage() {
  const handleAddUser = async () => {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        name: "John Doe",
        email: `john${Math.random()}@example.com`,
        image: "https://via.placeholder.com/150",
      }),
    })
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <button onClick={handleAddUser}>add new user</button>
          <NumberInput value="1234567890" />
          <ConnectButton />;
        </div>
      </section>
    </>
  )
}
