#!/bin/bash
cd backend/util/;
mvn package;
wait;
cd ../..;
if [ "$#" == 1 ]; then
	cd backend/util/target/classes/;
	java edu.oswego.util.utility.Configure $1;
	wait;
else 
	if [ "$#" == 2 ]; then
		cd backend/util/target/classes/;
		java edu.oswego.util.utility.Configure $1 $2
		wait;
	else
		cd backend/util/target/classes/;
		java edu.oswego.util.utility.Configure
		wait;
	fi
fi
cd ../../../../
if [ "$#" == 1 ]; then
	if [ "$1" == "run" ]; then
		mvn -f backend/Login-microservice liberty:run &>/dev/null &
		disown
		mvn -f backend/Professor-microservice liberty:run &>/dev/null &
		disown
		mvn -f backend/Student-microservice liberty:run &>/dev/null &
		disown
		mvn -f backend/Utility-microservice liberty:run &>/dev/null &
		disown
		echo "PeerSet will continute to start in the background."
		echo "Please give PeerSet about 1 minute to start fully."
	else
		if [ "$1" == "end" ]; then
			mvn -f backend/Utility-microservice liberty:stop;
			wait;
			mvn -f backend/Student-microservice liberty:stop;
			wait;
			mvn -f backend/Professor-microservice liberty:stop;
			wait;
			mvn -f backend/Login-microservice liberty:stop;
			wait;
			echo "Shutdown completed!"
		fi
	fi
fi
