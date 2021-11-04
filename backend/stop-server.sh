#!
echo "Stopping services..."
while IFS= read -r line;
do 
	cd `pwd`$line
	echo "Stopping service in `pwd`"
	mvn liberty:stop &
	cd ..
done < $1