class Enrollment < ApplicationRecord
  belongs_to :user
  belongs_to :course
  has_many :group_memberships, dependent: :destroy
  has_many :groups, through: :group_memberships
  has_many :submissions
  has_many :attendances

  validates_inclusion_of :role, in: %w(ta student teacher observer)

  validates_uniqueness_of :user_id, scope: :course_id

  def self.students(course_id)
    # select ("u.id, u.first_name, u.last_name")
    # .joins("INNER JOIN users u ON enrollments.user_id = u.id")
    # .joins("INNER JOIN courses c ON enrollments.course_id = c.id")
    # .where("enrollments.role = 'student' AND c.id = ?", course_id)
    students = []
    Enrollment.where(course_id: course_id, role: 'student').each do |enroll|
      user_id = enroll.user_id
      students << User.find(user_id)
    end
    students
  end
end
