FactoryBot.define do
  factory :course_nav do
    name 'Home'
    url '/courses'
    priority 0
    course nil
  end
end
