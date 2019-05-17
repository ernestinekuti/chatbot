package io.pivhix.course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;



    public List<Course> getAllcourses(String id){

        List<Course> courses = new ArrayList<>();
        courseRepository.findByTopicId(id)
        .forEach(courses :: add);
        return courses;
    }

    public Course getcourse(String id){

        //return courses.stream().filter(t -> t.getId().equals(id)).findFirst().get();
    return courseRepository.findById(id).orElse(null);

    }

    public void addcourse(Course course){
        courseRepository.save(course);

    }

    public void updatecourse( Course course){
     /*   for(int i = 0; i < courses.size(); i++){
            course t = courses.get(i);
            if(t.getId().equals(id)){
                courses.set(i, course);
                System.out.println("in here");
                        return;
            }
        }*/

        courseRepository.save(course);


    }

    public void deletecourse(String id){
    //courses.removeIf((t -> t.getId().equals(id)));
        courseRepository.deleteById(id);

        }

}
