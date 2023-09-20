CREATE DATABASE IF NOT EXISTS spm DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE spm;

create table staff_details (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	description VARCHAR(255),
	price DECIMAL(5,2) NOT NULL,
	address VARCHAR(50) NOT NULL
);









insert into activity (name, description, price, address) values ('Airplane Tours', 'Take in breathtaking views from above as you soar through the skies in a small airplane.', 31, '40003 Ruskin Hill');
insert into activity (name, description, price, address) values ('Cycling', 'Enjoy the beauty of the great outdoors as you cycle through scenic routes and landscapes.', 30, '1584 Linden Road');
insert into activity (name, description, price, address) values ('Dune Bashing', 'Ride over sand dunes in a specially designed vehicle, experiencing the thrill of speed and adventure.', 33, '5 Morningstar Road');
insert into activity (name, description, price, address) values ('Glamping', 'Experience camping in style with luxury amenities and accommodations in the great outdoors.', 37, '432 Meadow Vale Lane');
insert into activity (name, description, price, address) values ('Golfing', 'Perfect your swing and enjoy a leisurely day on the green, surrounded by beautiful landscapes.', 51, '7 Melrose Trail');
insert into activity (name, description, price, address) values ('Kite Surfing', 'Combine the thrill of surfing with the excitement of flying a kite as you ride the waves on a kiteboard.', 60, '59 Upham Hill');
insert into activity (name, description, price, address) values ('Museum Tours', 'Explore the world of art, history, and science as you visit museums and galleries around the world.', 56, '14463 Dunning Hill');
insert into activity (name, description, price, address) values ('Paintball', 'Experience the thrill of tactical warfare as you compete with friends and family in a high-adrenaline paintball game.', 42, '4373 Blue Bill Park Plaza');
insert into activity (name, description, price, address) values ('Shark Cage Diving', 'Get up close and personal with some of the ocean''s most fearsome predators as you observe sharks from the safety of a cage.', 37, '90 Crest Line Drive');
insert into activity (name, description, price, address) values ('Ziplining', 'Soar through the air while suspended from a cable, experiencing the thrill of speed and height as you zip over forests and canyons.', 41, '9253 Spaight Drive');
insert into activity (name, description, price, address) values ('Jet Skiing', 'Ride a personal watercraft over waves and choppy water, feeling the wind in your hair and the spray of water on your face.', 58, '1632 Corry Avenue');
insert into activity (name, description, price, address) values ('Windsurfing', 'Combine the thrill of surfing with the power of the wind, using a sail attached to a board to catch the breeze and glide over the water.', 53, '13718 Tony Court');
insert into activity (name, description, price, address) values ('Stand-Up Paddleboarding', 'Explore the water while standing on a board and using a paddle to move through the water, combining the tranquility of kayaking with the challenge of balancing on a board.', 31, '071 Holy Cross Circle');
insert into activity (name, description, price, address) values ('Swimming with Sharks', 'Get up close and personal with these fascinating and fearsome creatures on a guided underwater adventure.', 54, '960 Jay Parkway');
insert into activity (name, description, price, address) values ('Tandem Paragliding', 'Soar through the skies and take in breathtaking views while safely attached to an experienced paraglider.', 42, '80907 Longview Crossing');
insert into activity (name, description, price, address) values ('Theme Park Rides', 'Scream and laugh your way through thrilling roller coasters and other adrenaline-pumping attractions.', 57, '0 Loomis Court');
insert into activity (name, description, price, address) values ('Tree Top Adventures', 'Navigate through challenging obstacle courses and zip lines high up in the treetops.', 55, '85206 Lighthouse Bay Alley');
insert into activity (name, description, price, address) values ('Underground Cave Exploring', 'Explore the mysterious and beautiful underground world of caves and caverns with an experienced guide.', 58, '3294 Stone Corner Road');
insert into activity (name, description, price, address) values ('Water Skiing', 'Glide across the water on skis while being pulled behind a motorboat.', 48, '905 Scoville Point');
insert into activity (name, description, price, address) values ('Whale Watching', 'Observe these magnificent creatures in their natural habitat and learn about their behavior and habitat from expert guides.', 56, '775 Jackson Road');
insert into activity (name, description, price, address) values ('Zorbing', 'Get inside a giant, inflatable ball and roll downhill for an exhilarating experience.', 31, '01 Garrison Street');
insert into activity (name, description, price, address) values ('Airsoft', 'Experience a realistic military simulation game using replica firearms that fire small plastic pellets.', 55, '663 Bonner Parkway');
insert into activity (name, description, price, address) values ('Archery', 'Learn the art of using a bow and arrow to hit targets with precision.', 35, '8398 Starling Junction');
insert into activity (name, description, price, address) values ('Astronomy Tours', 'Discover the beauty of the night sky and learn about the stars and constellations.', 56, '0545 Johnson Junction');
insert into activity (name, description, price, address) values ('ATV Tours', 'Explore off-road trails and rugged terrain on an all-terrain vehicle (ATV).', 54, '86 Dakota Center');
insert into activity (name, description, price, address) values ('Camping', 'Get back to nature and spend a night under the stars in the great outdoors.', 37, '9 Crescent Oaks Junction');
insert into activity (name, description, price, address) values ('Climbing', 'Scale vertical rock faces with ropes and climbing gear for a challenging workout.', 50, '609 Coolidge Parkway');
insert into activity (name, description, price, address) values ('Escape Rooms', 'Solve puzzles and clues to escape a themed room before time runs out.', 53, '783 Declaration Street');
insert into activity (name, description, price, address) values ('Falconry', 'Handle and fly trained birds of prey, such as hawks, falcons, and eagles.', 45, '97714 Park Meadow Court');
insert into activity (name, description, price, address) values ('Fishing', 'Cast a line and reel in fish from a river, lake, or ocean.', 58, '844 Cambridge Terrace');
insert into activity (name, description, price, address) values ('Hiking', 'Explore nature on foot by walking on trails and paths through mountains, forests, and other terrain.', 53, '7 Mallard Crossing');
insert into activity (name, description, price, address) values ('Jetpacking', 'Fly through the air with a water-powered jetpack.', 60, '157 Sycamore Point');
insert into activity (name, description, price, address) values ('Nordic Walking', 'Walk with poles for a low-impact, full-body workout that is easy on the joints.', 52, '359 Village Lane');
insert into activity (name, description, price, address) values ('Orienteering', 'Use a map and compass to navigate through wilderness terrain to find checkpoints.', 48, '8586 Mosinee Court');
insert into activity (name, description, price, address) values ('Bobsledding', 'Experience the thrill of racing down a bobsled track at high speeds with twists and turns.', 62, '41 Wayridge Pass');
insert into activity (name, description, price, address) values ('Climbing Wall', 'Challenge yourself and climb a wall with a variety of holds and routes.', 58, '9452 Vahlen Alley');
insert into activity (name, description, price, address) values ('Cross-Country Skiing', 'Enjoy the beauty of winter landscapes while skiing on trails through snowy terrain.', 36, '8004 Trailsway Alley');
insert into activity (name, description, price, address) values ('Dog Sledding', 'Experience the thrill of riding on a sled pulled by a team of strong and well-trained dogs.', 46, '40 Thompson Junction');
insert into activity (name, description, price, address) values ('Geocaching', 'Use GPS coordinates to find hidden treasures and caches in the great outdoors.', 59, '36767 Parkside Avenue');
insert into activity (name, description, price, address) values ('Glacier Hiking', 'Explore the beauty of glaciers while hiking on their icy terrain.', 37, '61880 Ridge Oak Junction');
insert into activity (name, description, price, address) values ('Helicopter Tour', 'See breathtaking views from above while touring in a helicopter.', 52, '9 Northfield Place');
insert into activity (name, description, price, address) values ('Sandboarding', 'Ride down sand dunes on a board, with options for beginners and experienced riders.', 48, '6888 Fairfield Junction');
insert into activity (name, description, price, address) values ('Sea Kayaking', 'Paddle through scenic coastlines and explore hidden coves and bays.', 44, '53575 Bowman Way');
insert into activity (name, description, price, address) values ('Ski Jumping', 'Experience the thrill of flying through the air on skis, launching from a specialized ski jump.', 38, '4463 Hermina Plaza');
insert into activity (name, description, price, address) values ('Tree Top Adventure', 'Experience a high ropes course, ziplines, and other challenges high up in the trees.', 64, '3 Lawn Hill');
insert into activity (name, description, price, address) values ('Wakeboarding', 'Ride the wake of a boat while being towed on a board, allowing for amazing tricks and jumps.', 61, '61 Dorton Junction');
insert into activity (name, description, price, address) values ('Whitewater Kayaking', 'Navigate through rapids and whitewater in a kayak, with options for beginners and experienced paddlers.', 50, '60 Merchant Court');
insert into activity (name, description, price, address) values ('Aerial Yoga', 'A unique form of yoga that combines traditional yoga postures with acrobatic movements in a suspended hammock.', 62, '94 Farwell Avenue');
insert into activity (name, description, price, address) values ('Alpine Coaster', 'A thrilling ride down the mountain on a gravity-powered sled.', 55, '41 Nova Alley');
insert into activity (name, description, price, address) values ('Archery Tag', 'A fast-paced game that combines archery and dodgeball. Players use bows and foam-tipped arrows to shoot opposing team members.', 43, '14 Pierstorff Street');
insert into activity (name, description, price, address) values ('Ax Throwing', 'A challenging and exciting activity where participants throw axes at targets.', 31, '8013 Monterey Lane');
insert into activity (name, description, price, address) values ('Backpacking', 'A multi-day hiking trip where participants carry their gear and supplies on their backs and camp in the wilderness.', 44, '41645 Golf Course Center');
insert into activity (name, description, price, address) values ('Bamboo Rafting', 'A peaceful and scenic rafting experience on a bamboo raft, often in calm rivers or lagoons.', 36, '0072 Northview Road');
insert into activity (name, description, price, address) values ('Bouldering', 'A type of rock climbing that involves climbing without ropes or harnesses on smaller boulders or indoor climbing walls.', 61, '83 Waubesa Avenue');
insert into activity (name, description, price, address) values ('Bubble Soccer', 'A hilarious and fun variation of soccer where players wear inflatable bubbles and bounce into each other while trying to score goals.', 37, '0796 Hagan Street');
insert into activity (name, description, price, address) values ('Cable Wakeboarding', 'A variation of wakeboarding where riders are pulled along by a cable system instead of a boat.', 40, '7917 Michigan Road');
insert into activity (name, description, price, address) values ('Canopy Tour', 'An adrenaline-fueled zip line tour through the treetops of a forest or jungle.', 44, '82449 Mayer Court');
insert into activity (name, description, price, address) values ('Canyoning', 'A thrilling combination of hiking, climbing, and swimming through canyons and gorges.', 65, '27876 International Park');
insert into activity (name, description, price, address) values ('Cave Diving', 'A specialized form of scuba diving that involves exploring underwater caves and caverns.', 65, '129 Lindbergh Circle');
insert into activity (name, description, price, address) values ('Cliff Diving', 'A daring activity that involves jumping off high cliffs into water.', 55, '0611 Bartelt Circle');
insert into activity (name, description, price, address) values ('Escape Room', 'A group activity where participants are locked in a room and must solve puzzles and clues to escape.', 61, '660 Warbler Plaza');
insert into activity (name, description, price, address) values ('High Ropes Course', 'An exhilarating obstacle course set high in the trees that challenges participants to navigate through obstacles using ropes and bridges.', 49, '1 Mallard Alley');
insert into activity (name, description, price, address) values ('Ice Climbing', 'A challenging and adventurous sport that involves climbing frozen waterfalls and ice formations.', 42, '0186 Sachtjen Alley');
insert into activity (name, description, price, address) values ('Kayak Fishing', 'A peaceful and enjoyable way to fish from a kayak in calm lakes or rivers.', 65, '11 Farwell Lane');
insert into activity (name, description, price, address) values ('Laser Tag', 'A fun and competitive game where players use lasers to tag opposing team members.', 40, '85413 Muir Center');
insert into activity (name, description, price, address) values ('Log Rolling', 'A unique activity where participants balance on a spinning log in the water.', 33, '97 Judy Parkway');
insert into activity (name, description, price, address) values ('Mountain Biking', 'A thrilling way to explore mountain trails on a bicycle.', 60, '31 Maryland Circle');
insert into activity (name, description, price, address) values ('Mountain Climbing', 'A challenging and rewarding activity that involves climbing to the top of a mountain.', 60, '938 New Castle Way');
insert into activity (name, description, price, address) values ('Mountain Boarding', 'A thrilling variation of skateboarding that involves riding down mountain trails on a board with large wheels.', 40, '14154 Monument Center');
insert into activity (name, description, price, address) values ('Nature Walk', 'A peaceful and informative walk through nature with a guide.', 57, '319 Claremont Terrace');
insert into activity (name, description, price, address) values ('Obstacle Course Race', 'A challenging race that involves navigating through a variety of obstacles such as walls, ropes, and mud pits.', 38, '694 Morning Place');
insert into activity (name, description, price, address) values ('Off-Roading', 'An exciting way to explore rugged terrain in a four-wheel drive vehicle.', 48, '11827 Bowman Place');
insert into activity (name, description, price, address) values ('Rock Climbing', 'Get ready to scale some of the most beautiful natural formations around with our expert guides.', 55, '26996 Pine View Court');
insert into activity (name, description, price, address) values ('Bungee Jumping', 'Leap into the unknown with our safe and thrilling bungee jumping activities.', 35, '8 Montana Street');
insert into activity (name, description, price, address) values ('Hot Air Ballooning', 'Take in the stunning views from high up above with our hot air ballooning experiences.', 47, '96 Hanover Pass');
insert into activity (name, description, price, address) values ('Canyoneering', 'Descend into a world of hidden waterfalls, pools, and rocky cliffs as you navigate through canyons.', 30, '4456 Sauthoff Place');
insert into activity (name, description, price, address) values ('Snowboarding', 'Ride the slopes with style and skill with our expert-led snowboarding activities.', 37, '5207 Vidon Road');
insert into activity (name, description, price, address) values ('Snowmobiling', 'Get ready for a fast and exhilarating ride through the snow-covered wilderness with our snowmobiling tours.', 33, '938 Mayfield Court');
insert into activity (name, description, price, address) values ('Ice Skating', 'Glide over the ice and enjoy the crisp winter air with our ice skating activities for all ages.', 33, '57 Sutteridge Avenue');
insert into activity (name, description, price, address) values ('Ice Fishing', 'Experience the thrill of catching your own fish through a hole in the ice with our guided ice fishing tours.', 37, '7 Hollow Ridge Parkway');
insert into activity (name, description, price, address) values ('Sailing', 'Set sail on the open waters and feel the wind in your hair with our sailing activities.', 33, '4772 Portage Terrace');
insert into activity (name, description, price, address) values ('Yachting', 'Enjoy the ultimate luxury experience on board one of our state-of-the-art yachts.', 36, '47 Burning Wood Alley');
insert into activity (name, description, price, address) values ('Surfing', 'Catch a wave and ride it to the shore with our expert-led surfing lessons and tours.', 38, '3 Crest Line Way');
insert into activity (name, description, price, address) values ('Kiteboarding', 'Harness the power of the wind and glide over the waves with our kiteboarding activities.', 57, '126 Westport Pass');
insert into activity (name, description, price, address) values ('Wind Surfing', 'Get ready for an adrenaline-packed ride with our wind surfing experiences.', 56, '396 Russell Lane');
insert into activity (name, description, price, address) values ('Kayaking', 'Explore the calm waters of lakes and rivers with our guided kayaking tours.', 60, '997 Di Loreto Parkway');
insert into activity (name, description, price, address) values ('Canoeing', 'Paddle through serene waters and enjoy the beauty of nature with our canoeing activities.', 50, '3 Merrick Way');
insert into activity (name, description, price, address) values ('Paddleboarding', 'Experience the thrill of standing on water and paddling your way through the waves with our paddleboarding lessons.', 34, '77871 Weeping Birch Center');
insert into activity (name, description, price, address) values ('Snorkeling', 'Discover the hidden treasures of the underwater world with our snorkeling tours.', 44, '696 Roxbury Way');
insert into activity (name, description, price, address) values ('Scuba Diving', 'Dive deep into the ocean and explore its incredible beauty with our scuba diving experiences.', 55, '96847 Mifflin Pass');
insert into activity (name, description, price, address) values ('Flyboarding', 'Experience the ultimate rush of flying over water with our flyboarding activities.', 31, '3768 Barby Center');
insert into activity (name, description, price, address) values ('Parasailing', 'Soar high in the sky and take in the breathtaking views with our parasailing experiences.', 58, '8 Forest Run Trail');
insert into activity (name, description, price, address) values ('Jetpack Flying', 'Take your water sports experience to the next level with our jetpack flying activities.', 65, '830 Roxbury Pass');
insert into activity (name, description, price, address) values ('Hang Gliding', 'Experience the freedom of flight and soar over the mountains with our hang gliding tours.', 58, '777 Moland Street');
insert into activity (name, description, price, address) values ('Paragliding', 'Glide through the sky and enjoy the stunning views with our paragliding activities.', 35, '17 Sutherland Street');
insert into activity (name, description, price, address) values ('Skydiving', 'Experience the ultimate adrenaline rush with our skydiving experiences.', 34, '00 Manley Terrace');
insert into activity (name, description, price, address) values ('Indoor Skydiving', 'Feel the thrill of skydiving without the need for a plane or parachute with our indoor skydiving activities.', 64, '680 Sage Plaza');
insert into activity (name, description, price, address) values ('Helicopter Tours', 'Take in the beauty of the world from above with our helicopter tours.', 34, '94895 Mesta Pass');
insert into activity (name, description, price, address) values ('Ballooning', 'Float gently through the air and experience the tranquility of a hot air balloon ride.', 62, '892 Petterle Alley');
insert into activity (name, description, price, address) values ('Horseback Riding', 'Experience the natural beauty of the outdoors with our horseback riding tours.', 65, '58063 Weeping Birch Drive');
insert into activity (name, description, price, address) values ('Rock Scrambling', 'Explore rocky terrain and enjoy the views from high above with our expert-led rock scrambling activities.', 54, '8 Cardinal Point');
insert into activity (name, description, price, address) values ('Via Ferrata', 'Experience the thrill of scaling rocky cliffs with our via ferrata tours.', 54, '633 Iowa Trail');
insert into activity (name, description, price, address) values ('Mountaineering', 'Take on the challenge of climbing a mountain and experience the thrill of a lifetime.', 53, '9 Basil Terrace');