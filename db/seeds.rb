require 'faker'

def create_announcements
  counter = 1
  Course.all.each do
    5.times do
      body = Faker::HarryPotter.quote + ' ' + Faker::GameOfThrones.quote + ' ' + Faker::BackToTheFuture.quote
      publish_at = DateTime.now + rand(60) - 30
      published = [true, false].sample
      course_id = counter
      Announcement.create(body: body, publish_at: publish_at, published: published, course_id: course_id)
    end
    counter += 1
  end
end

def create_assignments
  counter = 1
  Course.all.each do
    grading_group_id = 1
    assignment_counter = 1
    3.times do
      unlocks_at = DateTime.now
      locks_at = DateTime.now + 3.months
      title = "Assignment #{assignment_counter}: #{Faker::ProgrammingLanguage.name}"
      Assignment.create(
        course_id: counter,
        grading_group_id: grading_group_id,
        title: title,
        description: Faker::Hipster.paragraph,
        due_date: Time.at(rand * Time.now.to_i),
        points: rand(50...100),
        published: true,
        submission_type: 'online',
        grade_type: ['graded', 'not_graded', 'complete', 'incomplete', 'points'].sample,
        unlocks_at: unlocks_at,
        locks_at: locks_at)
      assignment_counter += 1
      grading_group_id += 1
    end
    counter += 1
  end
end

def create_attendances
  counter = 1
  Enrollment.all.each do
    15.times do
      my_date = DateTime.now.to_s
      present = [true, false].sample
      absent = !present
      present == true ? tardy = [true, false].sample : tardy = nil
      tardy == true ? tardy_time = [5, 10, 15, 20].sample : tardy_time = nil
      badge = ['Great!', 'Outstanding!', 'Ninja!', 'Hedgehog!', 'Over 9000!!', 'Duck Soup!'].sample
      Attendance.create(
        date: my_date,
        present: present,
        absent: absent,
        tardy: tardy,
        tardy_time: tardy_time,
        total_attendance: [1, 0.95, 0.9, 0.8, 0.7, 0.65, 0.6, 0.5].sample,
        badge: badge,
        enrollment_id: counter
      )
    end
    counter += 1
  end
end

def create_grading_groups
  counter = 1
  Course.all.each do
    #note there is no guarantee of all groups for a course adding up to a total of 100% weight
    10.times do
      name = Faker::Demographic.demonym
      weight = (rand(100) + 1 ) / 100
      course_id = counter
      GradingGroup.create(name: name, weight: weight, course_id: course_id)
    end
    counter += 1
  end
end

def create_group_memberships
  #must fire after all groups and enrollments are created (obviously)
  enrollment_counter = Enrollment.count
  is_leader = [false, false, false, true]
  group_counter = 0
  Group.all.each do
    #each group has four members (enrollments)
    4.times do
      enrollment_id = enrollment_counter
      group_id = group_counter
      group_leader = is_leader[group_counter]
      GroupMembership.create(enrollment_id: enrollment_id, group_id: group_id, group_leader: group_leader)
      #we're adding enrollments to groups from the last element (count) towards the first
      enrollment_counter -= 1
    end
    group_counter += 1
  end
end

def create_groups
  counter = 1
  Course.all.each do
    #Trying to create less groups than students, so some student enrollments have no group membership(s)
    #just like in real life
    2.times do
      name = Faker::Dog.breed
      course_id = counter
      Group.create(name: name, course_id: course_id)
    end
    counter += 1
  end
end

def create_quiz_questions
  #must, of course, run after quizzes have been created; 
  counter = 1
  Quiz.all.each do
    20.times do
      answer_type = ['multiple_choice', 'true_false', 'essay'].sample
      points = [5, 10, 15, 20].sample
      body = Faker::FamilyGuy.quote
      #totally made this up on the spot. It will need to be modified.
      question_data = {
        question: "Does #{Faker::AquaTeenHungerForce.character} like #{Faker::Beer.style}?",
        answer: {
          a: 'Yes',
          b: 'No',
          c: 'Who knows?',
          d: Faker::Book.author,
        },
      }
      quiz_id = counter
      Question.create(answer_type: answer_type, points: points, body: body, question_data: question_data, quiz_id: quiz_id)
    end
    counter += 1
  end
end

def create_unit_items
  counter = 1
  Unit.all.each do
    10.times do
      item_type = Faker::Coffee.blend_name
      #and, assuming this is not the primary id column
      item_id = Faker::Coffee.variety
      UnitItem.create(item_type: item_type, item_id: item_id, unit_id: counter)
    end
    counter += 1
  end
end

def create_units
  counter = 1
  Course.all.each do
    position = 1
    4.times do
      name = Faker::HarryPotter.house
      course_id = counter
      Unit.create(name: name, position: position, course_id: course_id)
      position += 1
    end
    counter += 1
  end
end

def create_wikis
  counter = 1
  Course.all.each do
    3.times do
      pinned = [true, false].sample
      published = [true, false].sample
      is_public = [true, false].sample
      publish_at = DateTime.now
      wiki_type = ['type1', 'type2', 'type3', 'type4'].sample
      title = Faker::Dune.title + ' ' + Faker::Dune.character
      body = ""
      3.times do
        body += Faker::Dune.saying + ' ' + Faker::Dune.quote + ' '
      end
      course_id = counter
      Wiki.create(
        pinned: pinned, 
        published: published, 
        public: is_public, 
        publish_at: publish_at, 
        wiki_type: wiki_type,
        course_id: course_id, 
        title: title, 
        body: body)
    end
    counter += 1
  end
end

course_name = [
  'U of U Pro Ed Web Development',
  'Full Stack Web Development',
  'Part-Time Web Development',
  'Part-Time UX Design',
  'U of U Pro Ed Web Development',
  'Full Stack Web Development',
  'Part-Time Web Development',
  'Part-Time UX Design',
  'U of U Pro Ed Web Development',
  'Full Stack Web Development',
]

department = [ 'Full-Time', 'Part-Time', 'Code on']

time_zone = [ 'PTZ', 'MTZ', 'CTZ', 'ETZ']

quiz_type = [ 'Multiple Choice', 'Essay', 'Short Answer']

puts "Seeding database...\n "

@student = User.create(
  first_name: 'student',
  last_name: 'student',
  email: 'student@student.com',
  password: 'password',
  bio: Faker::RickAndMorty.quote,
  nickname: Faker::Seinfeld.character,
  is_admin: false,
  image: Faker::Fillmurray.image(true)
)
@admin = User.create(
  first_name: 'admin',
  last_name: 'admin',
  email: 'admin@admin.com',
  password: 'password',
  bio: Faker::Dune.quote,
  nickname: 'DJ Jungst',
  is_admin: true,
  image: "https://robohash.org/#{Faker::Number.number(1)}?set=set2"
)

@teacher = User.create( email: 'teacher@teacher.com',
  password: 'password',
  first_name: 'Dave',
  last_name: 'Jungst',
  bio: "Experienced Co-Founder with a demonstrated history of working in the computer software industry. Skilled in Web Development, Scalability, Agile Methodologies, QA, and Application Programming Interfaces. Strong engineering professional with a background in education and a passion for social impact projects. OSS maintainer / contributor. Educator and JavaScript enthusiast.",
  image: "https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAKLAAAAJGZlMDA2Nzk5LWNjNzItNDk3Mi05ZDZhLTQ1M2RlNTRjM2MxYQ.jpg",
  nickname: 'Crypto King'
)
puts "Created Test Admin, email: admin@admin.com and password: password"
puts "Created Teacher, email: teacher@teacher.com and password: password"
puts "Created Student, email: student@student.com and password: password"

10.times do |i|
  @course = Course.create(
    name: course_name[i],
    time_zone: time_zone.sample,
    department: department.sample,
    description: "This is a course about #{Faker::BackToTheFuture.character}.",
    starts: 'Mon, 12 November 2018 14:00:00 +0800',
    ends: 'Fri, 27 December 2018 14:00:00 +0800')

  Enrollment.create(
    role: 'teacher',
    user_id: @teacher.id,
    course_id: @course.id)

  10.times do
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    student = User.create(
      email: Faker::Internet.email,
      password: 'password',
      first_name: first_name,
      last_name: last_name,
      bio: "#{Faker::Demographic.race},
      #{Faker::Demographic.educational_attainment},
      #{Faker::Demographic.marital_status},
      #{Faker::Demographic.sex},
      #{Faker::Demographic.height}",
      image: "https://robohash.org/#{Faker::Number.number(4)}",
      nickname: Faker::Pokemon.name)
    Enrollment.create(
    role: 'student',
    user_id: student.id,
    course_id: @course.id)
  end

  3.times do
    first_name = Faker::Name.first_name
    last_name = Faker::Name.last_name
    ta = User.create(
      email: Faker::Internet.email,
      password: 'password',
      first_name: first_name,
      last_name: last_name,
      bio: "#{Faker::Demographic.race},
      #{Faker::Demographic.educational_attainment},
      #{Faker::Demographic.marital_status},
      #{Faker::Demographic.sex},
      #{Faker::Demographic.height}",
      nickname: Faker::Pokemon.name,
      image: "https://robohash.org/#{Faker::Number.number(1)}?set=set4"
    )
    Enrollment.create(
      role: 'ta',
      user_id: ta.id,
      course_id: @course.id)
  end

  15.times do |l|
    name = "Quiz #{l + 1}: #{Faker::ProgrammingLanguage.name}"
    Quiz.create(
      course_id: @course.id,
      name: name,
      due_date: 'Fri, 16 November 2018 14:00:00 +0800',
      points: rand(50...100),
      quiz_type: quiz_type.sample,
      available_from: 'Mon, 12 November 2018 14:00:00 +0800',
      available_until: 'Fri, 16 November 2018 14:00:00 +0800',
      published: true)
  end
end

print "Created TAs, students, courses, quizzes, enrollments..."
create_announcements
print "announcements..."
create_attendances
print "attendances..."
create_grading_groups
print "grading groups..."
create_groups
print "groups..."
create_group_memberships
print "group memberships..."
create_quiz_questions
print "questions for quizzes..."
create_units
print "units..."
create_unit_items
print "items for units..."
create_wikis
print "wikis on courses..."
create_assignments
print "assignments ...\n"

puts "\nCounts:"
puts "  users: #{User.count}"
puts "  enrollments: #{Enrollment.count}"
puts "  courses: #{Course.count}"
puts "  units: #{Unit.count}"
puts "  unit_items: #{UnitItem.count}"
puts "  announcements: #{Announcement.count}"
puts "  assignments: #{Assignment.count}"
puts "  quizzes: #{Quiz.count}"
puts "  questions: #{Question.count}"
puts "  wikis: #{Wiki.count}"
puts "  groups: #{Group.count}"
puts "  group_memberships: #{GroupMembership.count}"
puts "  grading_groups: #{GradingGroup.count}"
