# Izzup Url Structure

* /market
  * /free
  * /forsale
  * /wanted
* /events
  * /nearby
  * /occurring
  * /by/{{username}}
* /news
  * /weather
  * /sports
  * /politics
  * /entertainment
  * /financial
  * /by/{{username}}
    * /weather
    * /sports
    * /politics
    * /entertainment
    * /financial
    * /{{uid}}/{{headlineSlug}}
* /pub
  * /story
    * /by/{{username}}
    * /{{uid}}/{{titleSlug}}
  * /article
    * /by/{{username}}
    * /{{uid}}/{{nameSlug}}
  * /opinion
    * /of/{{username}}
    * /{{uid}}/{{titleSlug}}
  * /howto
    * /by/{{username}}
    * /{{uid}}/{{nameSlug}}
  * /project
    * /by/{{username}}
    * /{{uid}}/{{nameSlug}}
  * /fiction
    * /by/{{username}}
    * /{{uid}}/{{nameSlug}}
  * /report
    * /by/{{username}}
    * /{{uid}}/{{nameSlug}}
  * /proposal
    * /by/{{username}}
    * /{{uid}}/{{titleSlug}}
  * /decision
    * /by/{{username}}
    * /{{uid}}/{{titleSlug}}
  * /agreement
    * /by/{{username}}
    * /{{uid}}/{{titleSlug}}


## Homepage https://www.izzup.com/

Links to the best content from our users and the Fediverse.


## Market /market

* Consumer to Consumer Sales (C2C)
* Business to Business Sales (B2B)


## Market Free Stuff /market/free

* Free items receive free listings


## Market For Sale /market/forsale

* Free basic listing
* Additional features for a fee:
  * Embed PayPal or Bitcoin payment link
  * Preferred Search Placement
  * Homepage Placement
  * Section Page Placement
  * Unlimited ad content


## Market In Search Of /market/wanted

* List products or services you are looking for.
* Free basic listing
* Additional features for a fee:
  * Preferred Search Placement
  * Homepage Placement
  * Section Page Placement
  * Unlimited ad content

## Events /events
  * /nearby
  * /occurring
  * /by/{{username}}
## News  /news
  * /weather
  * /sports
  * /politics
  * /entertainment
  * /financial
  * /by/{{username}}
    * /weather
    * /sports
    * /politics
    * /entertainment
    * /financial
    * /{{uid}}/{{headlineSlug}}
## Publications /pub

Anything that is not *news* or an *event* will be a publication.

### Common URL Structure

All will have three similar URL

*  /{{pubType}} 
*  /by/{{username}}
*  /{{uid}}/{{nameSlug}}

#### Homepage - /{{pubType}}  

Curated content from our members and the Fediverse

#### Member Homepage /{{pubType}}/by/{{username}}

Each member has their own list page for their content with the publication type.

#### Content Page /{{pubType}}/{{uid}}/{{titleSlug}}

This page has an actual publication.

### Publication Types
* Story - /story
* Article - /article
* Opinion - /opinion
* HowTo -  /howto
* Project - /project
* Fiction - /fiction
* Report - /report
* Proposal - /proposal
* Decision - /decision
* Agreement - /agreement

#### Story - /story
#### Article - /article
#### Opinion - /opinion
#### HowTo -  /howto
* Project - /project
* Fiction - /fiction
* Report - /report
* Proposal - /proposal
### Decision - /decision
### Agreement - /agreement




