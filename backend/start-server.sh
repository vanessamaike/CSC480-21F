#!
echo "Starting services..."
while read line;
do 
	cd $line
	echo "Beginning service in $line"
	mvn liberty:run &
done < $1
