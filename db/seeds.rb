require 'faker'

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

@admin = User.create(
  first_name: 'admin',
  last_name: 'admin',
  email: 'admin@admin.com',
  password: 'password',
  bio: "This is a really good bio don't ya know...",
  nickname: 'DJ Jungst',
  is_admin: true,
  image: "https://robohash.org/#{Faker::Number.number(1)}?set=set2"
)

@teacher = User.create(
  email: 'teacher@teacher.com',
  password: 'password',
  first_name: 'Dave',
  last_name: 'Jungst',
  bio: "Experienced Co-Founder with a demonstrated history of working in the computer software industry. Skilled in Web Development, Scalability, Agile Methodologies, QA, and Application Programming Interfaces. Strong engineering professional with a background in education and a passion for social impact projects. OSS maintainer / contributor. Educator and JavaScript enthusiast.",
  image: "https://media-exp2.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAKLAAAAJGZlMDA2Nzk5LWNjNzItNDk3Mi05ZDZhLTQ1M2RlNTRjM2MxYQ.jpg",
  nickname: 'Crypto King'
)

10.times do |i|
  @course = Course.create(
    name: course_name[i],
    time_zone: time_zone[i],
    department: department[i],
    description: 'This is a course.',
    starts: 'Mon, 12 November 2018 14:00:00 +0800',
    ends: 'Fri, 27 December 2018 14:00:00 +0800'
  )

  Enrollment.create(
    role: 'teacher',
    user_id: @teacher.id,
    course_id: @course.id
  )

  10.times do
    student = User.create(
      email: Faker::Internet.email,
      password: 'password',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      bio: "#{Faker::Demographic.race},
      #{Faker::Demographic.educational_attainment},
      #{Faker::Demographic.marital_status},
      #{Faker::Demographic.sex},
      #{Faker::Demographic.height}",
      image: "https://robohash.org/#{Faker::Number.number(4)}",
      nickname: Faker::Pokemon.name,
    )
    Enrollment.create(
      role: 'student',
      user_id: student.id,
      course_id: @course.id
    )
  end

  3.times do
    ta = User.create(
      email: Faker::Internet.email,
      password: 'password',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
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
      course_id: @course.id
    )
  end

  15.times do |l|
    Quiz.create(
      course_id: @course.id,
      name: "Quiz #{l + 1}: #{Faker::ProgrammingLanguage.name}",
      due_date: 'Fri, 16 November 2018 14:00:00 +0800',
      points: rand(50...100),
      quiz_type: quiz_type[l],
      available_from: 'Mon, 12 November 2018 14:00:00 +0800',
      available_until: 'Fri, 16 November 2018 14:00:00 +0800',
      published: true
    )
  end

  15.times do |a|
    Assignment.create(
      course_id: @course.id,
      title: "Assignment #{a + 1}: #{Faker::ProgrammingLanguage.name}",
      description: Faker::Hipster.paragraph,
      submission_type: 'Online',
      points: rand(50...100),
      due_date: 'Fri, 16 November 2018 14:00:00 +0800',
      published: true,
      unlocks_at: 'Mon, 12 November 2018 14:00:00 +0800',
      locks_at: 'Fri, 16 November 2018 14:00:00 +0800'
    )
  end  
end

1.times do
  student = User.create(
    first_name: 'student',
    last_name: 'student',
    email: 'test@test.com',
    password: 'password',
    bio: "This is a really good bio don't ya know...",
    nickname: 'Spencer is BOSS',
    is_admin: false,
    image: "https://robohash.org/#{Faker::Number.number(1)}?set=set4"
  )
  3.times do |i|
    Enrollment.create(
      role: 'student',
      user_id: student.id,
      course_id: "#{i + 1}".to_i
    )
  end
end

puts "\nTest Admin seeded email: admin@admin.com and password: password"
puts "Test Student seeded email: test@test.com and password: password \n "

puts "10 courses seeded"
puts "5 quizzes seeded"
puts "5 assignments seeded"

puts "\n10 students seeded with enrollment for each course"
puts "3 TAs seeded with enrollment for each course"
puts "1 teacher seeded with enrollment to every course."
