<template>
  <q-card flat :style="content.minMaxReadableWidth()">
    <q-card-section class="text-center text-h2 text-weight-medium"
      >About Ultri</q-card-section
    >
    <q-card-section class="text-left">
      <p class="text-h3">Mission</p>
      <p class="text-h4 text-italic">
        We want to help good people, do great things.
      </p>
    </q-card-section>

    <q-card-section class="text-left">
      <p class="text-h3">Overview</p>
      <p class="text-body1">
        Ultri is a group of independent tech companies, working cooperatively,
        to develop and support open-source software.
      </p>
    </q-card-section>

    <q-card-section class="text-left">
      <p class="text-h3">Vision</p>
      <p class="text-body1">
        We see a world where many small tech shops work together to provide
        consumers better services and better prices, than the big tech companies
        can. We believe we can do this while also providing better pay, and a
        much better quality of life for the workers of the small tech companies.
      </p>
    </q-card-section>

    <q-card-section class="text-left">
      <p class="text-h3">What We Do</p>
      <p class="text-body1">
        We offer hosting, domain registration, technical consulting and custom
        development services. We also operate a number of websites offering both
        free and paid services. The revenue from the paid services and
        development contracts subsidizes the free Fediverse services we offer.
      </p>
    </q-card-section>

    <q-card-section class="text-left">
      <p class="text-h3">Beliefs</p>
      <q-list bordered class="rounded-borders">
        <q-expansion-item expand-separator label="Small is beautiful">
          <q-card>
            <q-card-section> </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item expand-separator label="Large is inherently evil">
          <q-card>
            <q-card-section> </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item expand-separator label="People should own their data">
          <q-card>
            <q-card-section> </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          expand-separator
          label="Nothing is truly free, there is always a cost."
        >
          <q-card>
            <q-card-section> </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
import useContent from "../../composables/content";
const content = useContent();
</script>
