#!
echo "Stopping services..."
while read line;
do 
	cd $line
	echo "Stopping service in $line"
	mvn liberty:stop &
done < $1
