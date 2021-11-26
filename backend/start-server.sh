echo "Starting services..."
while IFS= read -r line;
do 
        echo $line
	cd `pwd`$line
	echo "Beginning service in `pwd`"
	mvn liberty:run &
	cd ..
done < $1