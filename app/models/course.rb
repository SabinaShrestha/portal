class Course < ApplicationRecord
  after_create :generate_nav_links

  #associations
  has_many :course_navs
  has_many :course_files
  has_many :wikis
  has_many :grading_groups
  has_many :groups
  has_many :enrollments, dependent: :destroy
  has_many :users, through: :enrollments
  has_many :units
  #not sure about this association
  has_many :attendances

  validates_presence_of :name, :description, :department

  def generate_nav_links
    [
      { name: 'Home', url: "/courses/#{self.id}" },
      { name: 'Announcements', url: "/courses/#{self.id}/announcments" },
      { name: 'People', url: "/courses/#{self.id}/people" },
      { name: 'Modules', url: "/courses/#{self.id}/modules" },
      { name: 'Wiki', url: "/courses/#{self.id}/wiki" },
      { name: 'Grades', url: "/courses/#{self.id}/grades" },
      { name: 'Assignments', url: "/courses/#{self.id}/assignments" },
      { name: 'Attendance', url: "/courses/#{self.id}/attendance" },
      { name: 'Quizzes', url: "/courses/#{self.id}/quizzes" },
    ].each_with_index do |nav, i|
      self.course_navs.create(name: nav[:name], url: nav[:url], priority: i)
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

end
