FactoryBot.define do
  factory :course do
    name "U of U Pro Ed Web Development"
    description "This is a course"
    department "Full-Time"
    starts { DateTime.now }
    ends { DateTime.now + 3.months }
    published true

    factory :concluded do
      concluded true
    end

    factory :unpublished do
      published false
    end
  end
end
