echo "Starting services..."
while IFS= read -r line;
do 
	cd `pwd`$line
	echo "Beginning service in `pwd`"
	mvn liberty:run &
	cd ..
done < $1