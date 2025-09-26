"use client";
import Image from "next/image";
import styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import { Button } from "antd";

export default function PokemonApp() {
  let [pokemonList, setPokemonList] = useState<any[]>([]);
  let [pokemonToDisplay, setPokemonToDisplay] = useState<number>(20);
  let [loading, setLoading] = useState<boolean>(false);
  let [isLogoClicked, setIsLogoClicked] = useState<boolean>(false);

  // Fonction de fetch
  const fetchPokemons = async () => {
    setLoading(true);
    setTimeout(async () => {
      const newPokemons: any[] = [];
      for (let i = 1; i <= pokemonToDisplay; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        const data = await response.json();
        newPokemons.push({
          id: i,
          name: data.name,
          type: data.types[0].type.name,
          weight: data.weight,
        });
      }
      setPokemonList(newPokemons);
      setLoading(false);
    }, 500);
  };

  // Fetch au montage + à chaque changement du nombre à afficher
  useEffect(() => {
    fetchPokemons();
  }, [pokemonToDisplay]);

  const handleClickLogo = () => {
    setIsLogoClicked(!isLogoClicked);
  };

  const handleClickNext = () => {
    setPokemonToDisplay(pokemonToDisplay + 20);
  };

  const handleClickAboutMe = () => {
    window.location.href = "https://linktr.ee/victorblanchard";
  };

  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <img
          src="/Pokemon_logo.svg"
          alt="logo"
          onClick={() => {
            handleClickLogo();
          }}
        />
      </div>
      {isLogoClicked && (
        <div className={styles.logoText}>
          <h1>
            Bienvenue dans le monde Pokémon ! Ce projet à pour objectif de consommer l'API de
            PokéAPI pour afficher les Pokémons. Bonne visite !
          </h1>
        </div>
      )}
      <div className={styles.pokemonContainer}>
        {pokemonList.map((pokemon) => (
          <div key={pokemon.id} className={`${styles.pokemon} ${styles[pokemon.type]}`}>
            <div className={styles.imgContainer}>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${pokemon.id}.gif`}
                alt={pokemon.name}
              />
            </div>
            <div className={styles.info}>
              <h3 className={styles.name}>{pokemon.name}</h3>
              <h3 className={styles.number}># {pokemon.id}</h3>
              <span className={styles.type}>
                Type: <span>{pokemon.type}</span>
              </span>
              <span className={styles.weight}>
                Weight: <span>{pokemon.weight} kg</span>
              </span>
            </div>
          </div>
        ))}
      </div>
      <Button
        className={styles.nextButton}
        loading={loading}
        onClick={() => {
          handleClickNext();
        }}
      >
        {loading ? "Loading..." : "Next 20 pokemons"}
      </Button>
      <div className={styles.aboutMeContainer}>
        <Button className={styles.aboutMeButton} onClick={handleClickAboutMe}>
          About me
        </Button>
      </div>
    </div>
  );
}
