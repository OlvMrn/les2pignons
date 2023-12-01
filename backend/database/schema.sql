CREATE TABLE destination (
 id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
 country VARCHAR(100) NOT NULL
);

INSERT INTO destination (country) VALUES
("Afghanistan"),
("Albanie"),
("Algérie"),
("Andorre"),
("Angola"),
("Antigua-et-Barbuda"),
("Argentine"),
("Arménie"),
("Australie"),
("Autriche"),
("Azerbaïdjan"),
("Bahamas"),
("Bahreïn"),
("Bangladesh"),
("Barbade"),
("Bélarus"),
("Belgique"),
("Belize"),
("Bénin"),
("Bhoutan"),
("Bolivie"),
("Bosnie-Herzégovine"),
("Botswana"),
("Brésil"),
("Brunéi"),
("Bulgarie"),
("Burkina Faso"),
("Burundi"),
("Côte d'Ivoire"),
("Cap-Vert"),
("Cambodge"),
("Cameroun"),
("Canada"),
("République centrafricaine"),
("Tchad"),
("Chili"),
("Chine"),
("Colombie"),
("Comores"),
("Congo (Brazzaville)"),
("Costa Rica"),
("Croatie"),
("Cuba"),
("Chypre"),
("Tchéquie (République tchèque)"),
("République démocratique du Congo"),
("Danemark"),
("Djibouti"),
("Dominique"),
("République dominicaine"),
("Équateur"),
("Égypte"),
("Salvador"),
("Guinée équatoriale"),
("Érythrée"),
("Estonie"),
("Eswatini (anciennement ""Swaziland"")"),
("Éthiopie"),
("Fidji"),
("Finlande"),
("France"),
("Gabon"),
("Gambie"),
("Géorgie"),
("Allemagne"),
("Ghana"),
("Grèce"),
("Grenade"),
("Guatemala"),
("Guinée"),
("Guinée-Bissau"),
("Guyana"),
("Haïti"),
("Saint-Siège"),
("Honduras"),
("Hongrie"),
("Islande"),
("Inde"),
("Indonésie"),
("Iran"),
("Irak"),
("Irlande"),
("Israël"),
("Italie"),
("Jamaïque"),
("Japon"),
("Jordanie"),
("Kazakhstan"),
("Kenya"),
("Kiribati"),
("Koweït"),
("Kirghizistan"),
("Laos"),
("Lettonie"),
("Liban"),
("Lesotho"),
("Libéria"),
("Libye"),
("Liechtenstein"),
("Lituanie"),
("Luxembourg"),
("Madagascar"),
("Malawi"),
("Malaisie"),
("Maldives"),
("Mali"),
("Malte"),
("Îles Marshall"),
("Mauritanie"),
("Maurice"),
("Mexique"),
("Micronésie"),
("Moldavie"),
("Monaco"),
("Mongolie"),
("Monténégro"),
("Maroc"),
("Mozambique"),
("Myanmar (anciennement Birmanie)"),
("Namibie"),
("Nauru"),
("Népal"),
("Pays-Bas"),
("Nouvelle-Zélande"),
("Nicaragua"),
("Niger"),
("Nigeria"),
("Corée du Nord"),
("Macédoine du Nord"),
("Norvège"),
("Oman"),
("Pakistan"),
("Palaos"),
("État de Palestine"),
("Panama"),
("Papouasie-Nouvelle-Guinée"),
("Paraguay"),
("Pérou"),
("Philippines"),
("Pologne"),
("Portugal"),
("Qatar"),
("Roumanie"),
("Russie"),
("Rwanda"),
("Saint-Kitts-et-Nevis"),
("Sainte-Lucie"),
("Saint-Vincent-et-les-Grenadines"),
("Samoa"),
("Saint-Marin"),
("Sao Tomé-et-Principe"),
("Arabie saoudite"),
("Sénégal"),
("Serbie"),
("Seychelles"),
("Sierra Leone"),
("Singapour"),
("Slovaquie"),
("Slovénie"),
("Îles Salomon"),
("Somalie"),
("Afrique du Sud"),
("Corée du Sud"),
("Soudan du Sud"),
("Espagne"),
("Sri Lanka"),
("Soudan"),
("Suriname"),
("Suède"),
("Suisse"),
("Syrie"),
("Tadjikistan"),
("Tanzanie"),
("Thaïlande"),
("Timor-Leste"),
("Togo"),
("Tonga"),
("Trinité-et-Tobago"),
("Tunisie"),
("Turquie"),
("Turkménistan"),
("Tuvalu"),
("Ouganda"),
("Ukraine"),
("Émirats arabes unis"),
("Royaume-Uni"),
("États-Unis d'Amérique"),
("Uruguay"),
("Ouzbékistan"),
("Vanuatu"),
("Venezuela"),
("Vietnam"),
("Yémen"),
("Zambie"),
("Zimbabwe");

CREATE TABLE article (
 id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
 category VARCHAR(50) NOT NULL,
 title VARCHAR(255) NOT NULL,
 picture VARCHAR(255) NOT NULL,
 content TEXT NOT NULL,
 publish_date DATE NOT NULL,
 destination_id INT UNSIGNED NOT NULL,
 FOREIGN KEY (destination_id) REFERENCES destination(id)
);

INSERT INTO article (category, title, picture, content, publish_date, destination_id) VALUES
("travel", "Nos premiers kilomètres en Asie Centrale", ".././public/assets/images/article1.jpg", "Après plusieurs rappels à l’ordre d’envoyer notre newsletter, nous avons enfin lâché le guidon pour vous partager nos premières impressions et nos belles expériences au Kazakhstan. Nous vous proposons de vous servir une belle tasse de thé et/ou de café avant de commencer la lecture 😉. Mais avant tout, voilà à quoi ressemble notre itinéraire sur ces prochains mois !", "2023-11-30", (SELECT id FROM destination WHERE country = "Kazakhstan"));

INSERT INTO article (category, title, picture, content, publish_date, destination_id) VALUES
("travel", "L’été kirghize", ".././public/assets/images/article2.jpg", "Ce fut un début d’été chaud mais aussi plein d’attente; celle de notre newsletter#2 😝!!  Si cette dernière s’est tant faite désirée (ou pas) c’est que soit nous pédalions, soit nous buvions du thé avec nos multiples rencontres kirghizes, russes, tatares, dunganes ou avec des cyclo-randonneurs ! Le pays étant constitué principalement de montagnes (90% du pays) dont la moitié à plus de 2500m, nous avons pu nous régaler de grimpettes et pu comparer plusieurs cols et vallées.Pour couronner le tout, Maud et David, des copains venus de France, nous ont escorté (et engraissé) sur une bonne semaine, de belles vacances estivales en somme.Avant d’entrer dans le vif du sujet, voici à quoi ressemble notre itinéraire sur ce mois dernier. Vous pourrez revenir sur cette carte à mesure que vous avancez dans la lecture de ces 6 chapitres (chapitres, carrément !).", "2023-11-30", (SELECT id FROM destination WHERE country = "Kirghizistan"));
