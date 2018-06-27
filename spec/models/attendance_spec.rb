require 'rails_helper'

RSpec.describe Attendance, type: :model do

  describe 'attributes' do
    it { should respond_to(:present) }
    it { should respond_to(:tardy) }
    it { should respond_to(:tardy_time) }
    it { should respond_to(:reason) }
    it { should respond_to(:excused) }
    it { should respond_to(:absent) }
    it { should respond_to(:date) }
    it { should respond_to(:total_attendance) }
    it { should respond_to(:badge) }
  end

  describe 'validations' do
    it { should validate_presence_of(:date)}
    #we were unsure if the following should also be validated:
      #tardy
      #absent
      #present
  end

  describe 'associations' do
    it { should belong_to(:course) }
    it { should belong_to(:enrollment) }
  end


end
