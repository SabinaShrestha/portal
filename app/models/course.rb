class Course < ApplicationRecord
  after_create :generate_nav_links

  #associations
  has_many :course_navs, dependent: :destroy
  has_many :course_files, dependent: :destroy
  has_many :wikis, dependent: :destroy
  has_many :grading_groups, dependent: :destroy
  has_many :groups, dependent: :destroy
  has_many :enrollments, dependent: :destroy
  has_many :users, through: :enrollments

  has_many :units, dependent: :destroy
  has_many :quizzes, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :announcements, dependent: :destroy
  validates_presence_of :name, :description, :department

  def generate_nav_links
    [
      { name: 'Home', url: "/courses/#{self.id}" },
      { name: 'Announcements', url: "/courses/#{self.id}/announcements" },
      { name: 'People', url: "/courses/#{self.id}/people" },
      { name: 'Modules', url: "/courses/#{self.id}/modules" },
      { name: 'Wiki', url: "/courses/#{self.id}/wiki" },
      { name: 'Grades', url: "/courses/#{self.id}/grades" },
      { name: 'Assignments', url: "/courses/#{self.id}/assignments" },
      { name: 'Attendance', url: "/courses/#{self.id}/attendance" },
      { name: 'Quizzes', url: "/courses/#{self.id}/quizzes" },
      { name: 'Settings', url: "/courses/#{self.id}/settings", visible: false },
    ].each_with_index do |nav, i|
      visible = nav[:visible] == false ? false : true
      self.course_navs.create(name: nav[:name], url: nav[:url], priority: i, visible: visible)
    end
  end

  def self.active
    where('concluded <> true')
  end

  def self.active_with_enrollments(id)
    select('courses.*, e.role, e.id AS enrollment_id')
    .joins("INNER JOIN enrollments e ON e.course_id = courses.id
                   AND e.user_id = #{id}")
    .where("concluded = FALSE
           AND
             (CASE
             WHEN e.role = 'teacher' OR e.role = 'ta'
             THEN courses.published = TRUE OR courses.published = FALSE
             ELSE
               courses.published = TRUE
             END)"
         )
  end

  def self.copy_course(course, new_course)
    Course.create(name: new_course['name'],
                  description: new_course['description'],
                  time_zone: new_course['time_zone'],
                  department: new_course['department'],
                  starts: new_course['starts'],
                  ends: new_course['ends'],
                  lock_after_end: new_course['lock_after_end'],
                  lock_before_start: new_course['lock_before_start'],
                  course_options: new_course['course_options'],
                  feature_flags: new_course['feature_flags'],
                  course_home: new_course['course_home'],
                  published: new_course['published'],
                  concluded: new_course['concluded'])
    new_course_id = Course.last.id
    Wiki.where(course_id: course.id).each do |wiki|
      Wiki.create(course_id: new_course_id, 
        pinned: wiki.pinned, 
        published: wiki.published,
        publish_at: wiki.publish_at,
        public: wiki.public,
        wiki_type: wiki.wiki_type,
        title: wiki.title,
        body: wiki.body)
    end
    Unit.where(course_id: course.id).each do |unit|
      Unit.create(name: unit.name, 
                  position: unit.position, 
                  course_id: new_course_id)
      new_unit_id = Unit.last.id
      UnitItem.where(unit_id: unit.id).each do |unit_item|
        UnitItem.create(unit_id: new_unit_id, 
                        item_id: unit_item.item_id, 
                        item_type: unit_item.item_type)
      end
    end
    GradingGroup.where(course_id: course.id).each do |grading_group|
      GradingGroup.create(course_id: new_course_id,
                          name: grading_group.name,
                          weight: grading_group.weight)
    end
    Quiz.where(course_id: course.id).each do |quiz|
      Quiz.create(course_id: new_course_id,
                  name: quiz.name,
                  due_date: quiz.due_date,
                  points: quiz.points,
                  quiz_type: quiz.quiz_type,
                  available_from: quiz.available_from,
                  available_until: quiz.available_until,
                  published: quiz.published)
      new_quiz_id = Quiz.last.id
      Question.where(quiz_id: quiz.id).each do |question|
        Question.create(quiz_id: new_quiz_id,
                        answer_type: question.answer_type, 
                        points: question.points, 
                        body: question.body, 
                        question_data: question.question_data)
      end
    end
  end

end
