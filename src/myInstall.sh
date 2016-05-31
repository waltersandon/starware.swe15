#!/bin/bash
if [[ $UID != 0 ]]; then
	echo "Please run this script with sudo:"
	echo "sudo $0 $*"
	exit 1
fi

export LC_ALL=C

if [ "$1" == "install" ] || [ "$1" == "reset" ] || [ "$1" == "start" ] || [ "$1" == "stop" ]; then
	pkill node
	killall node
	pkill mongod
	killall mongod
	
	if [ "$1" == "install" ]; then
		npm install
	fi
	
	if [ "$1" == "install" ] || [ "$1" == "reset" ]; then
		mongod > /dev/null &
		echo -ne "MongoDB avviato con successo!\n"
		node ./bootstrap.js
		pkill mongod
		killall mongod
	elif [ "$1" == "start" ]; then
		mongod > /dev/null &
		echo -ne "MongoDB avviato con successo!\n"
		node ./server.js > /dev/null &
		echo -ne "Server avviato con successo!\n"
	elif [ "$1" == "stop" ]; then
		echo -ne "L'applicazione e' stata fermata con successo!\n"
	fi
else
	echo -ne "Lanciare lo script con una delle seguenti opzioni:\n"
	echo -ne "	install :\n		Vengono installate i moduli node necessari all'applicazione\n		viene inizializzato il database con gli utenti, le domande e i questionari di default\n		ATTENZIONE: tutti i dati presenti nel database verranno persi \n\n"
	echo -ne "	reset : \n		Il database viene cancellato e ripristinato con gli utenti, le domande e i questionari di default\n		ATTENZIONE: tutti i dati presenti nel database verranno persi \n\n"
	echo -ne "	start :\n		Viene avviato il database e il server web.\n		 Una volta avviati l'applicazione sara' raggiungibile da browswer all'indirizzo localhost:3000 \n\n"
	echo -ne "	stop :\n		Viene fermato il database e il server web spegnendo completamente l'applicazione \n\n"
fi



