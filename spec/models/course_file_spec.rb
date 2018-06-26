require 'rails_helper'

RSpec.describe CourseFile, type: :model do 
  it { should belong_to(:course)}
  it { should validate_presence_of(:url)}
end
