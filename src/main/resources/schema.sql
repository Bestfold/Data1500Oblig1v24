create table KinoBillett
(
                             id bigint auto_increment primary key,
                             film varchar(255),
                             antall int,
                             fornavn varchar(255),
                             etternavn varchar(255),
                             telefon_nr varchar(255),
                             epost varchar(255)
);

create table AvailableFilms
(
                                     film varchar(255) primary key,
                                     titleSimple varchar(255),
                                     hours int,
                                     imageUrl varchar(255)
);