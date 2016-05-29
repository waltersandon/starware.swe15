#!/bin/bash
if [[ $UID != 0 ]]; then
    echo "Please run this script with sudo:"
    echo "sudo $0 $*"
    exit 1
fi
if [ "$1" == "-i" ] || [ "$1" == "install" ]; then
	mongod > /dev/null &
	mongoPid=""
	if [ $? -eq 0 ]; then
		mongoPid=$!
		if [ $mongoPid != "" ]; then
			#echo "mongo is running on Pid = $mongoPid"
			npm install > /dev/null &
			wait $!
		else
			echo "Si è verificato un errore con MongoDB"
			exit 1
		fi
		node ./bootstrap.js
		wait $!
		pkill mongod > /dev/null &
	else
		echo "Si è verificato un errore con MongoDB"
		exit 1
	fi
elif [ "$1" == "-r" ] || [ "$1" == "reset" ]; then
	mongod > /dev/null &
	mongoPid=""
	if [ $? -eq 0 ]; then
		mongoPid=$!
		if [ $mongoPid != "" ]; then
			#echo "mongo is running on Pid = $mongoPid"
			sleep 2
			node ./bootstrap.js &
			wait $!

		else
			echo "Si è verificato un errore con MongoDB"
			exit 1
		fi
		pkill mongod > /dev/null &
	else
		echo "Si è verificato un errore con MongoDB"
		exit 1
	fi
elif [ "$1" == "-s" ] || [ "$1" == "start" ]; then
	mongod > /dev/null &
	mongoPid=""
	serverPid=""
	if [ $? -eq 0 ]; then
		mongoPid=$!
		echo "mongo is running on Pid = $mongoPid"
		sleep 2
		node ./server.js > /dev/null &
	fi
	if [ $? -eq 0 ]; then
		serverPid=$!
		echo "server is running on Pid = $serverPid"
	fi
elif [ "$1" == "-q" ] || [ "$1" == "quit" ]; then
	pkill mongod &
	pkill node &
	echo -ne "L'applicazione è stata fermata con successo\n"
else
	echo -ne "Lanciare lo script con una delle seguenti opzioni:\n"
	echo -ne "	-i oppure install :\n		Vengono installate i moduli node necessari all'applicazione\n		viene inizializzato il database con gli utenti, le domande e i questionari di default\n		ATTENZIONE: tutti i dati presenti nel database verranno persi \n\n"
	echo -ne "	-r oppure reset : \n		Il database viene cancellato e ripristinato con gli utenti, le domande e i questionari di default\n		ATTENZIONE: tutti i dati presenti nel database verranno persi \n\n"
	echo -ne "	-s oppure start :\n		Viene avviato il database e il server web.\n		 Una volta avviati l'applicazione sarà raggiungibile da browswer all'indirizzo localhost:3000 \n\n"
	echo -ne "	-q oppure quit :\n		Viene fermato il database e il server web spegnendo completamente l'applicazione \n\n"
fi
 
